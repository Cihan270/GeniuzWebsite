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

  const { register, handleSubmit, reset, getValues } = useForm<FormValues>({
    defaultValues: { url: "" },
  })

  const onSubmit = handleSubmit(async (values) => {
    setUrlError(null)
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
    } finally {
      setLoading(false)
    }
  })

  const handleReset = () => {
    setReport(null)
    setUrlError(null)
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
          {report ? (
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

      {report ? <WebsiteScanResult report={report} /> : null}
    </div>
  )
}

function WebsiteScanResult({ report }: { report: WebsiteScanReport }) {
  return (
    <div className="space-y-8 border-t border-border pt-8">
      <div className="rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-sm">
        <p className="font-medium text-foreground">
          {report.meta.resultBanner}
        </p>
        <p className="mt-1 text-muted-foreground">
          Ingevoerde URL (niet gecrawld):{" "}
          <span className="break-all text-foreground">{report.requestedUrl}</span>
        </p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {websiteScanFlowCopy.overallLabel}
        </p>
        <p className="mt-2 font-mono text-5xl tabular-nums tracking-tight">
          {report.overallScore}
          <span className="text-2xl text-muted-foreground">/100</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Vaste demoscore — identiek voor elke URL in dit prototype.
        </p>
      </div>

      <div>
        <h3 className="text-lg">{websiteScanFlowCopy.dimensionsLabel}</h3>
        <ul className="mt-4 space-y-0 border-t border-border">
          {report.dimensions.map((dim) => (
            <li
              key={dim.id}
              className="grid gap-2 border-b border-border py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
            >
              <div>
                <p className="font-medium">{dim.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dim.summary}
                </p>
              </div>
              <p className="font-mono text-xl tabular-nums sm:pt-0.5">
                {dim.score}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
