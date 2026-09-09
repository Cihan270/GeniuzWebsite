import type { Metadata } from "next"
import { Geist, Geist_Mono, Newsreader } from "next/font/google"

import { MotionProvider } from "@/components/motion/motion-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  // Plain string, not a template: `app/[locale]/layout.tsx` defines its own,
  // and a template here would also wrap that layout's default title —
  // producing "… | Geniuz | Geniuz" on any page without its own metadata.
  title: `${SITE_NAME} | AI Consultancy en Maatwerk AI-oplossingen`,
  description: SITE_TAGLINE,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        {/*
          Reveal animations server-render with inline opacity:0 and only become
          visible once Motion runs. Without JS that leaves the whole page blank,
          so force everything visible in that case.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
