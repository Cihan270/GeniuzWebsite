import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ContainerSize = "default" | "wide" | "narrow" | "prose"

const sizeClass: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-4xl",
  prose: "max-w-3xl",
}

type ContainerProps = ComponentProps<"div"> & {
  size?: ContainerSize
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClass[size],
        className
      )}
      {...props}
    />
  )
}
