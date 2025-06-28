"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchTrigger } from "@/components/search/search-trigger"
import { LoginButton } from "@/components/auth/login-button"
import { MobileNav } from "./mobile-nav"
import { Moon, Sun, Bed, FileText, Home, Pill, Fan, Layers, Volume2, Eye, Activity, Shirt, Briefcase } from "lucide-react"
import { useTheme } from "next-themes"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const productCategories = [
  {
    name: "Mattresses",
    slug: "mattresses",
    icon: Bed,
    description: "Memory foam, hybrid, innerspring, and latex mattresses.",
  },
  {
    name: "Pillows",
    slug: "pillows",
    icon: FileText,
    description: "Memory foam, down, down alternative, and specialty pillows.",
  },
  {
    name: "Beds",
    slug: "beds",
    icon: Home,
    description: "Bed frames, adjustable bases, and platform beds.",
  },
  {
    name: "Bedding",
    slug: "bedding",
    icon: FileText,
    description: "Sheets, comforters, duvets, and blankets.",
  },
  {
    name: "Bedroom Decor",
    slug: "bedroom-decor",
    icon: Home,
    description: "Furniture, lighting, and accessories.",
  },
  {
    name: "Supplements",
    slug: "supplements",
    icon: Pill,
    description: "Melatonin, magnesium, and herbal supplements.",
  },
  {
    name: "Air Quality",
    slug: "air-quality",
    icon: Fan,
    description: "Air purifiers, humidifiers, and aromatherapy.",
  },
  {
    name: "Mattress Toppers",
    slug: "mattress-toppers",
    icon: Layers,
    description: "Memory foam, latex, and cooling toppers.",
  },
  {
    name: "Sleep Aids",
    slug: "sleep-aids",
    icon: Volume2,
    description: "Sound machines and white noise generators.",
  },
  {
    name: "Sleep Masks",
    slug: "sleep-masks",
    icon: Eye,
    description: "Blackout masks and light-blocking solutions.",
  },
  {
    name: "Sleep Tracking",
    slug: "sleep-tracking",
    icon: Activity,
    description: "Wearables and sleep monitoring devices.",
  },
  {
    name: "Sleepwear",
    slug: "sleepwear",
    icon: Shirt,
    description: "Pajamas and loungewear for better sleep.",
  },
  {
    name: "Travel Sleep",
    slug: "travel-sleep",
    icon: Briefcase,
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

export function MainNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Moon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SleepDirectory</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                item.name === "Products" ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[800px] grid-cols-3 gap-3 p-4">
                        {productCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/directory/categories/${category.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <category.icon className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        pathname === item.href ? "bg-accent/50" : ""
                      )}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <SearchTrigger />
          </div>
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <LoginButton />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
