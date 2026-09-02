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
  title: {
    default: `${SITE_NAME} | AI Consultancy en Maatwerk AI-oplossingen`,
    template: `%s | ${SITE_NAME}`,
  },
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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
