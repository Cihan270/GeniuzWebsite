"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { ScanDisclaimer } from "@/components/scans/scan-disclaimer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  websiteScanFlowCopy,
  websiteScanPrototypeMeta,
} from "@/content/scans/website-demo"
import {
  getWebsiteScanProvider,
  type ReportDimension,
  type WebsiteScanReport,
} from "@/lib/scans/website-provider"
import {
  fieldErrorsFromZod,
  normalizeWebsiteUrl,
  websiteScanInputSchema,
} from "@/lib/validations"
import { cn } from "@/lib/utils"

type WebsiteScanFlowProps = {
  className?: string
}

type FormValues = { url: string }

export function WebsiteScanFlow({ className }: WebsiteScanFlowProps) {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<WebsiteScanReport | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [scanError, setScanError] = useState<string | null>(null)

  const { register, handleSubmit, reset, getValues } = useForm<FormValues>({
    defaultValues: { url: "" },
  })

  const onSubmit = handleSubmit(async (values) => {
    setUrlError(null)
    setScanError(null)
    const parsed = websiteScanInputSchema.safeParse(values)
    if (!parsed.success) {
      const errors = fieldErrorsFromZod(parsed.error)
      setUrlError(errors.url ?? "Ongeldige URL")
      return
    }

    setLoading(true)
    setReport(null)
    try {
      const provider = getWebsiteScanProvider()
      const next = await provider.analyze({
        url: normalizeWebsiteUrl(parsed.data.url),
      })
      setReport(next)
    } catch (error) {
      setScanError(
        error instanceof Error
          ? error.message
          : "De scan kon niet worden uitgevoerd",
      )
    } finally {
      setLoading(false)
    }
  })

  const handleReset = () => {
    setReport(null)
    setUrlError(null)
    setScanError(null)
    reset({ url: getValues("url") })
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline">{websiteScanPrototypeMeta.label}</Badge>
      </div>

      <ScanDisclaimer>{websiteScanPrototypeMeta.resultBanner}</ScanDisclaimer>

      <form onSubmit={onSubmit} className="max-w-xl space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="website-scan-url" className="text-sm font-medium">
            {websiteScanFlowCopy.urlLabel}
          </label>
          <p className="text-sm text-muted-foreground">
            {websiteScanFlowCopy.urlHelp}
          </p>
          <Input
            id="website-scan-url"
            type="url"
            inputMode="url"
            placeholder={websiteScanFlowCopy.urlPlaceholder}
            autoComplete="url"
            aria-invalid={Boolean(urlError) || undefined}
            className="h-10"
            disabled={loading}
            {...register("url")}
          />
          {urlError ? (
            <p className="text-sm text-destructive">{urlError}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" variant="accent" size="lg" disabled={loading}>
            {loading
              ? websiteScanFlowCopy.loadingLabel
              : websiteScanFlowCopy.submitLabel}
          </Button>
          {report || scanError ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleReset}
            >
              {websiteScanFlowCopy.resetLabel}
            </Button>
          ) : null}
        </div>
      </form>

      {scanError ? (
        <p
          role="alert"
          className="border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {scanError}
        </p>
      ) : null}

      {report ? <WebsiteScanResult report={report} /> : null}
    </div>
  )
}

function WebsiteScanResult({ report }: { report: WebsiteScanReport }) {
  return (
    <div className="space-y-8 border-t border-border pt-8">
      <div className="rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-sm">
        <p className="text-muted-foreground">
          Gescande URL:{" "}
          <span className="break-all text-foreground">
            {report.finalUrl ?? report.requestedUrl}
          </span>
        </p>
        <p className="mt-1 text-muted-foreground">
          {report.demoCount === 0
            ? `Alle ${report.measuredCount} dimensies zijn gemeten op deze pagina.`
            : `${report.measuredCount} van ${
                report.measuredCount + report.demoCount
              } dimensies zijn gemeten. De overige ${
                report.demoCount
              } zijn demodata en tellen niet mee in de score.`}
        </p>
        {report.notices.length > 0 ? (
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {report.notices.map((notice) => (
              <li key={notice}>· {notice}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {websiteScanFlowCopy.overallLabel}
        </p>
        <p className="mt-2 font-mono text-5xl tabular-nums tracking-tight">
          {report.overallScore ?? "—"}
          <span className="text-2xl text-muted-foreground">/100</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Gemiddelde over {report.measuredCount} gemeten dimensies. Structurele
          meting van deze pagina, geen voorspelling van posities in zoekmachines.
        </p>
      </div>

      <div>
        <h3 className="text-lg">{websiteScanFlowCopy.dimensionsLabel}</h3>
        <ul className="mt-4 space-y-0 border-t border-border">
          {report.dimensions.map((dim) => (
            <DimensionRow key={dim.id} dimension={dim} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function DimensionRow({ dimension }: { dimension: ReportDimension }) {
  const measured = dimension.source === "measured"

  return (
    <li className="border-b border-border py-5">
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{dimension.label}</p>
            <Badge variant={measured ? "default" : "outline"}>
              {measured
                ? websiteScanFlowCopy.measuredBadge
                : websiteScanFlowCopy.demoBadge}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {dimension.summary}
          </p>
        </div>
        <p
          className={cn(
            "font-mono text-xl tabular-nums sm:pt-0.5",
            !measured && "text-muted-foreground",
          )}
        >
          {dimension.score}
        </p>
      </div>

      {measured ? (
        <details className="mt-3 group">
          <summary className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:underline">
            {websiteScanFlowCopy.checksLabel}
          </summary>
          <ul className="mt-3 space-y-2 border-l-2 border-border pl-4">
            {dimension.checks.map((item) => (
              <li key={item.id} className="text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-foreground">{item.label}</span>
                  <span className="shrink-0 font-mono tabular-nums text-muted-foreground">
                    {item.points}/{item.maxPoints}
                  </span>
                </div>
                <p className="text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </li>
  )
}
