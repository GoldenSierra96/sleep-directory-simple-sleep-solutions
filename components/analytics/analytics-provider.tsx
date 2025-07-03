"use client"

import { useEffect, useRef, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

function AnalyticsComponent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      // Initialize analytics here
      console.log("Analytics initialized")
      initialized.current = true
    }
  }, [])

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    console.log("Page view tracked:", url)
  }, [pathname, searchParams])

  return null
}

function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsComponent />
    </Suspense>
  )
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnalyticsWrapper />
      {children}
      <Analytics />
    </>
  )
}
