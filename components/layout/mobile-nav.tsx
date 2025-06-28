"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchTrigger } from "@/components/search/search-trigger"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const productCategories = [
  {
    name: "Mattresses",
    slug: "mattresses",
    description: "Memory foam, hybrid, innerspring, and latex mattresses.",
  },
  {
    name: "Pillows",
    slug: "pillows",
    description: "Memory foam, down, down alternative, and specialty pillows.",
  },
  {
    name: "Beds",
    slug: "beds",
    description: "Bed frames, adjustable bases, and platform beds.",
  },
  {
    name: "Bedding",
    slug: "bedding",
    description: "Sheets, comforters, duvets, and blankets.",
  },
  {
    name: "Bedroom Decor",
    slug: "bedroom-decor",
    description: "Furniture, lighting, and accessories.",
  },
  {
    name: "Supplements",
    slug: "supplements",
    description: "Melatonin, magnesium, and herbal supplements.",
  },
  {
    name: "Air Quality",
    slug: "air-quality",
    description: "Air purifiers, humidifiers, and aromatherapy.",
  },
  {
    name: "Mattress Toppers",
    slug: "mattress-toppers",
    description: "Memory foam, latex, and cooling toppers.",
  },
  {
    name: "Sleep Aids",
    slug: "sleep-aids",
    description: "Sound machines and white noise generators.",
  },
  {
    name: "Sleep Masks",
    slug: "sleep-masks",
    description: "Blackout masks and light-blocking solutions.",
  },
  {
    name: "Sleep Tracking",
    slug: "sleep-tracking",
    description: "Wearables and sleep monitoring devices.",
  },
  {
    name: "Sleepwear",
    slug: "sleepwear",
    description: "Pajamas and loungewear for better sleep.",
  },
  {
    name: "Travel Sleep",
    slug: "travel-sleep",
    description: "Travel pillows and portable sleep aids.",
  },
]

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Blog", href: "/blog" },
  { name: "Forum", href: "/forum" },
  { name: "About", href: "/about" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-6 mt-6">
          <div className="px-2">
            <SearchTrigger />
          </div>

          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              item.name === "Products" ? (
                <Collapsible
                  key={item.name}
                  open={productsOpen}
                  onOpenChange={setProductsOpen}
                  className="space-y-2"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                    <span>Products</span>
                    <ChevronRight className={cn(
                      "h-4 w-4 transition-transform",
                      productsOpen ? "rotate-90" : ""
                    )} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-4">
                    {productCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/directory/categories/${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="block px-2 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
