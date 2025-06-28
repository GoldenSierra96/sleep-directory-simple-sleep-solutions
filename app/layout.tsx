import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { MainNav } from "@/components/layout/main-nav"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Suspense } from "react"
import SessionProviderWrapper from "@/components/SessionProviderWrapper"
import { DynamicBreadcrumbs } from "@/components/ui/DynamicBreadcrumbs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Sleep Directory - Your Complete Sleep Resource",
    template: "%s | Sleep Directory",
  },
  description: "Discover the best sleep products, expert advice, and connect with a community focused on better sleep.",
  keywords: ["sleep", "mattress", "pillow", "sleep products", "sleep health", "insomnia", "sleep disorders"],
  authors: [{ name: "Sleep Directory Team" }],
  creator: "Sleep Directory",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Sleep Directory - Your Complete Sleep Resource",
    description:
      "Discover the best sleep products, expert advice, and connect with a community focused on better sleep.",
    siteName: "Sleep Directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep Directory - Your Complete Sleep Resource",
    description:
      "Discover the best sleep products, expert advice, and connect with a community focused on better sleep.",
    creator: "@sleepdirectory",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AnalyticsProvider>
              <div className="relative flex min-h-screen flex-col">
                <MainNav />
                <DynamicBreadcrumbs />
                <Suspense>
                  <main className="flex-1">{children}</main>
                </Suspense>
              </div>
              <Toaster />
            </AnalyticsProvider>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
