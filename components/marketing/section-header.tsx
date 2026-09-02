import type { ComponentProps, ReactNode } from "react"

import { Eyebrow } from "@/components/marketing/eyebrow"
import { cn } from "@/lib/utils"

type SectionHeaderProps = ComponentProps<"header"> & {
  eyebrow?: ReactNode
  heading: ReactNode
  description?: ReactNode
  align?: "start" | "center"
  headingAs?: "h1" | "h2" | "h3"
}

export function SectionHeader({
  className,
  eyebrow,
  heading,
  description,
  align = "start",
  headingAs: HeadingTag = "h2",
  ...props
}: SectionHeaderProps) {
  return (
    <header
      data-slot="section-header"
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
      {...props}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <HeadingTag className="text-balance">{heading}</HeadingTag>
      {description ? (
        <div
          className={cn(
            "text-lead text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </div>
      ) : null}
    </header>
  )
}
