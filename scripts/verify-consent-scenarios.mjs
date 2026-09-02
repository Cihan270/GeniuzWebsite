/**
 * Automated verification of cookie consent scenarios (plan section 10).
 * Run: node scripts/verify-consent-scenarios.mjs
 * Requires dev server at http://localhost:3000
 */

import { chromium } from "playwright"

const BASE_URL = process.env.CONSENT_TEST_URL ?? "http://localhost:3000/nl"
const STORAGE_KEY = "geniuz_cookie_consent"

const results = []

function pass(id, detail) {
  results.push({ id, ok: true, detail })
  console.log(`✓ [${id}] ${detail}`)
}

function fail(id, detail) {
  results.push({ id, ok: false, detail })
  console.error(`✗ [${id}] ${detail}`)
}

async function freshPage(browser) {
  const context = await browser.newContext()
  await context.addInitScript((key) => {
    try {
      if (sessionStorage.getItem("__geniuzConsentTestBootstrapped")) return
      sessionStorage.setItem("__geniuzConsentTestBootstrapped", "1")
      localStorage.removeItem(key)
      localStorage.removeItem("geniuz-consent-v1")
    } catch {
      /* ignore */
    }
  }, STORAGE_KEY)
  const page = await context.newPage()
  return { context, page }
}

async function readConsent(page) {
  return page.evaluate((key) => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  }, STORAGE_KEY)
}

async function waitForHydration(page) {
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(500)
}

function hasVercelAnalyticsRequest(requests) {
  return requests.some(
    (url) =>
      url.includes("vercel") ||
      url.includes("va.vercel") ||
      url.includes("/_vercel/insights"),
  )
}

function hasVercelScriptInDom(scripts) {
  return scripts.some(
    (src) =>
      src.includes("vercel") ||
      src.includes("va.vercel") ||
      src.includes("/_vercel/insights"),
  )
}

async function collectScriptSrcs(page) {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll("script[src]")).map((s) => s.src),
  )
}

async function scenario1NewVisitor(page) {
  const requests = []
  page.on("request", (req) => requests.push(req.url()))

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  const bannerVisible = await page
    .getByRole("dialog", { name: /Cookies en lokale opslag/i })
    .isVisible()
    .catch(() => false)

  const scriptSrcs = await collectScriptSrcs(page)

  if (bannerVisible) {
    pass("1", "Banner visible for new visitor")
  } else {
    fail("1", "Banner not visible for new visitor")
  }

  if (!hasVercelAnalyticsRequest(requests) && !hasVercelScriptInDom(scriptSrcs)) {
    pass("1-network", "No Vercel Analytics requests/scripts before consent")
  } else {
    fail(
      "1-network",
      `Unexpected Vercel traffic: requests=${hasVercelAnalyticsRequest(requests)} scripts=${hasVercelScriptInDom(scriptSrcs)}`,
    )
  }
}

async function scenario2AcceptAll(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  const requests = []
  page.on("request", (req) => requests.push(req.url()))

  await page.getByRole("button", { name: "Alles accepteren" }).click()
  await page.waitForTimeout(1500)

  const consent = await readConsent(page)
  const bannerHidden = !(await page
    .getByRole("dialog", { name: /Cookies en lokale opslag/i })
    .isVisible()
    .catch(() => false))

  if (
    consent?.analytics === true &&
    consent?.marketing === true &&
    consent?.version === 1
  ) {
    pass("2", "Accept all stored consent with analytics+marketing true")
  } else {
    fail("2", `Unexpected consent after accept all: ${JSON.stringify(consent)}`)
  }

  if (bannerHidden) {
    pass("2-banner", "Banner hidden after accept all")
  } else {
    fail("2-banner", "Banner still visible after accept all")
  }

  const scriptSrcs = await collectScriptSrcs(page)
  if (hasVercelScriptInDom(scriptSrcs) || hasVercelAnalyticsRequest(requests)) {
    pass("2-network", "Vercel Analytics loaded after accept all")
  } else {
    fail("2-network", "Vercel Analytics not detected after accept all")
  }

  await page.reload({ waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  const consentAfterRefresh = await readConsent(page)
  if (
    consentAfterRefresh?.analytics === true &&
    consentAfterRefresh?.marketing === true
  ) {
    pass("2-refresh", "Consent persisted after refresh")
  } else {
    fail(
      "2-refresh",
      `Consent lost after refresh: ${JSON.stringify(consentAfterRefresh)}`,
    )
  }
}

async function scenario3RejectAll(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  const requests = []
  page.on("request", (req) => requests.push(req.url()))

  await page.getByRole("button", { name: "Alles weigeren" }).click()
  await page.waitForTimeout(1000)

  const consent = await readConsent(page)
  if (consent?.analytics === false && consent?.marketing === false) {
    pass("3", "Reject all stored consent with analytics+marketing false")
  } else {
    fail("3", `Unexpected consent after reject all: ${JSON.stringify(consent)}`)
  }

  const scriptSrcs = await collectScriptSrcs(page)
  if (!hasVercelScriptInDom(scriptSrcs) && !hasVercelAnalyticsRequest(requests)) {
    pass("3-network", "No Vercel Analytics after reject all")
  } else {
    fail("3-network", "Vercel Analytics present after reject all")
  }
}

async function scenario4CustomPreferences(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  await page.getByRole("button", { name: "Voorkeuren beheren" }).click()
  await page.waitForTimeout(300)

  const analyticsCheckbox = page.getByLabel("Analytics")
  const marketingCheckbox = page.getByLabel("Marketing")

  if (!(await analyticsCheckbox.isChecked())) {
    await analyticsCheckbox.check()
  }
  if (await marketingCheckbox.isChecked()) {
    await marketingCheckbox.uncheck()
  }

  const requests = []
  page.on("request", (req) => requests.push(req.url()))

  await page.getByRole("button", { name: "Voorkeuren opslaan" }).click()
  await page.waitForTimeout(1500)

  const consent = await readConsent(page)
  if (consent?.analytics === true && consent?.marketing === false) {
    pass("4", "Custom consent: analytics on, marketing off")
  } else {
    fail("4", `Unexpected custom consent: ${JSON.stringify(consent)}`)
  }

  const scriptSrcs = await collectScriptSrcs(page)
  if (hasVercelScriptInDom(scriptSrcs) || hasVercelAnalyticsRequest(requests)) {
    pass("4-network", "Analytics script loaded for custom consent")
  } else {
    fail("4-network", "Analytics script missing for custom consent")
  }
}

async function scenario5RevokeViaFooter(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  await page.getByRole("button", { name: "Alles accepteren" }).click()
  await page.waitForTimeout(1500)

  const requestsBefore = []
  const tracker = (req) => requestsBefore.push(req.url())
  page.on("request", tracker)

  await page.locator('[data-slot="site-footer"]').scrollIntoViewIfNeeded()
  await page
    .locator('[data-slot="site-footer"]')
    .getByRole("button", { name: "Cookievoorkeuren" })
    .click()
  await page.waitForTimeout(300)

  const modalVisible = await page
    .getByRole("dialog", { name: "Cookievoorkeuren" })
    .isVisible()
    .catch(() => false)

  if (modalVisible) {
    pass("5-modal", "Footer opens cookie preferences modal")
  } else {
    fail("5-modal", "Footer did not open preferences modal")
  }

  const analyticsCheckbox = page.getByLabel("Analytics")
  if (await analyticsCheckbox.isChecked()) {
    await analyticsCheckbox.uncheck()
  }

  const requestsAfterSave = []
  page.off("request", tracker)
  page.on("request", (req) => requestsAfterSave.push(req.url()))

  await page.getByRole("button", { name: "Voorkeuren opslaan" }).click()
  await page.waitForTimeout(1500)

  const consent = await readConsent(page)
  if (consent?.analytics === false) {
    pass("5", "Analytics revoked via footer preferences")
  } else {
    fail("5", `Analytics not revoked: ${JSON.stringify(consent)}`)
  }

  const scriptSrcs = await collectScriptSrcs(page)
  const newVercelAfterRevoke = requestsAfterSave.some(
    (url) => url.includes("vercel") || url.includes("/_vercel/insights"),
  )

  if (!newVercelAfterRevoke) {
    pass("5-network", "No new Vercel requests after revoking analytics")
  } else {
    fail("5-network", "New Vercel requests after revoking analytics")
  }

  if (scriptSrcs.some((s) => s.includes("vercel"))) {
    pass(
      "5-dom-note",
      "Pre-existing Vercel script may remain in DOM (expected limitation)",
    )
  }
}

async function scenario6Hydration(page) {
  const consoleErrors = []
  const consoleWarnings = []
  page.on("console", (msg) => {
    const text = msg.text()
    if (msg.type() === "error") consoleErrors.push(text)
    if (msg.type() === "warning") consoleWarnings.push(text)
  })

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" })
  await waitForHydration(page)

  const hydrationErrors = consoleErrors.filter(
    (e) =>
      e.includes("Hydration") ||
      e.includes("hydration") ||
      e.includes("useSyncExternalStore") ||
      e.includes("consent") ||
      e.includes("localStorage"),
  )

  const hydrationWarnings = consoleWarnings.filter(
    (w) =>
      w.includes("Hydration") ||
      w.includes("hydration") ||
      w.includes("useSyncExternalStore"),
  )

  if (hydrationErrors.length === 0) {
    pass("6", "No hydration/consent-related console errors")
  } else {
    fail("6", `Hydration errors: ${hydrationErrors.join("; ")}`)
  }

  if (hydrationWarnings.length === 0) {
    pass("6-warnings", "No hydration-related console warnings")
  } else {
    fail("6-warnings", `Hydration warnings: ${hydrationWarnings.join("; ")}`)
  }

  const eventFired = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const handler = (e) => {
        window.removeEventListener("cookie-consent-change", handler)
        resolve(Boolean(e.detail?.version))
      }
      window.addEventListener("cookie-consent-change", handler)
      const btn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.textContent?.trim() === "Alles weigeren",
      )
      btn?.click()
      setTimeout(() => resolve(false), 2000)
    })
  })

  if (eventFired) {
    pass("6-event", "cookie-consent-change event fires with detail")
  } else {
    fail("6-event", "cookie-consent-change event did not fire")
  }
}

async function main() {
  let browser
  try {
    browser = await chromium.launch({ headless: true })

    console.log(`\nCookie consent verification — ${BASE_URL}\n`)

    for (const scenario of [
      scenario1NewVisitor,
      scenario2AcceptAll,
      scenario3RejectAll,
      scenario4CustomPreferences,
      scenario5RevokeViaFooter,
      scenario6Hydration,
    ]) {
      const { context, page } = await freshPage(browser)
      await scenario(page)
      await context.close()
    }

    const failed = results.filter((r) => !r.ok)
    console.log(
      `\n--- Summary: ${results.length - failed.length}/${results.length} passed ---\n`,
    )

    if (failed.length > 0) {
      console.error("Failed checks:")
      for (const f of failed) console.error(`  - [${f.id}] ${f.detail}`)
      process.exit(1)
    }
  } catch (err) {
    console.error("Verification failed to run:", err.message)
    if (
      err.message.includes("Executable doesn't exist") ||
      err.message.includes("Cannot find module")
    ) {
      console.error("\nInstall Playwright: npx playwright install chromium")
    }
    process.exit(1)
  } finally {
    await browser?.close()
  }
}

main()
