import Link from "next/link"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { navHref } from "@/content/navigation"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

export type PageBreadcrumbItem = {
  label: string
  /** App path without locale; omit for current page. */
  href?: string
}

type PageBreadcrumbsProps = {
  items: readonly PageBreadcrumbItem[]
  locale: EnabledLocale
  className?: string
}

export function PageBreadcrumbs({
  items,
  locale,
  className,
}: PageBreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={navHref(item.href, locale)} />}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
