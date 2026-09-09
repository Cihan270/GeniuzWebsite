import { NotFoundTemplate } from "@/components/templates/not-found-template"

/**
 * Root 404 — only reached for paths the proxy matcher skips (asset-like URLs).
 * Renders without header/footer because those live in the locale layout; the
 * locale-level not-found handles everything a visitor normally hits.
 */
export default function NotFound() {
  return <NotFoundTemplate />
}
