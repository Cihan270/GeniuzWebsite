import Image from "next/image"
import { cn } from "@/lib/utils"
import { getImage, type ImageKey } from "@/content/images"

type BrandImageVariant = "editorial" | "thumbnail" | "ambient" | "banner"

type BrandImageProps = {
  imageKey: ImageKey
  variant?: BrandImageVariant
  className?: string
  priority?: boolean
}

const variantStyles: Record<
  BrandImageVariant,
  { wrapper: string; image: string; overlay: string }
> = {
  editorial: {
    wrapper: "aspect-[4/3] w-full max-w-md",
    image: "object-cover saturate-[0.82] contrast-[0.96]",
    overlay:
      "bg-[color-mix(in_oklch,var(--geniuz-ink)_14%,transparent)] bg-gradient-to-t from-[color-mix(in_oklch,var(--geniuz-ink)_28%,transparent)] via-transparent to-transparent",
  },
  thumbnail: {
    wrapper: "aspect-[16/10] w-full sm:w-36 shrink-0",
    image: "object-cover saturate-[0.78] contrast-[0.94]",
    overlay:
      "bg-[color-mix(in_oklch,var(--geniuz-ink)_10%,transparent)]",
  },
  ambient: {
    wrapper: "aspect-[3/1] w-full",
    image: "object-cover saturate-[0.65] contrast-[0.9] opacity-70",
    overlay:
      "bg-[color-mix(in_oklch,var(--geniuz-canvas)_55%,transparent)] bg-gradient-to-r from-geniuz-canvas via-transparent to-geniuz-canvas",
  },
  banner: {
    wrapper: "aspect-[5/2] w-full max-h-48",
    image: "object-cover saturate-[0.7] contrast-[0.92] opacity-80",
    overlay:
      "bg-[color-mix(in_oklch,var(--geniuz-surface)_40%,transparent)]",
  },
}

export function BrandImage({
  imageKey,
  variant = "editorial",
  className,
  priority = false,
}: BrandImageProps) {
  const image = getImage(imageKey)
  const styles = variantStyles[variant]

  return (
    <figure
      className={cn(
        "relative overflow-hidden",
        styles.wrapper,
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        className={cn("size-full", styles.image)}
        sizes={
          variant === "thumbnail"
            ? "144px"
            : variant === "ambient" || variant === "banner"
              ? "100vw"
              : "(max-width: 768px) 100vw, 400px"
        }
      />
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", styles.overlay)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 geniuz-grain opacity-[0.18]"
      />
      {variant === "editorial" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-px w-10 bg-accent"
        />
      ) : null}
    </figure>
  )
}
