import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon } from "lucide-react"
import { SeoSchema } from "@/components/seo-schema"

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Schema for Products Section */}
      <SeoSchema
        title="Sleep Products Directory - Sleep Directory"
        description="Explore our comprehensive directory of sleep products including mattresses, pillows, bedding, and sleep aids to improve your sleep quality."
        type="WebPage"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: "Products", item: "/directory/products", position: 3 },
        ]}
      />

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Moon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">SleepDirectory</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/directory" className="text-foreground font-medium">
                Directory
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Button>Submit Listing</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-muted/50">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/directory" className="hover:text-foreground">
              Directory
            </Link>
            <span className="mx-2">/</span>
            <Link href="/directory/products" className="hover:text-foreground">
              Products
            </Link>
          </nav>
        </div>
      </div>

      {children}

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Moon className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">SleepDirectory</span>
              </div>
              <p className="text-muted-foreground">Your comprehensive guide to better sleep solutions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Directory</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/directory/brands">Sleep Brands</Link>
                </li>
                <li>
                  <Link href="/directory/products">Products</Link>
                </li>
                <li>
                  <Link href="/directory/apps">Sleep Apps</Link>
                </li>
                <li>
                  <Link href="/directory/therapy">Therapy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/blog">Sleep Blog</Link>
                </li>
                <li>
                  <Link href="/guides">Sleep Guides</Link>
                </li>
                <li>
                  <Link href="/reviews">Reviews</Link>
                </li>
                <li>
                  <Link href="/research">Research</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/submit">Submit Listing</Link>
                </li>
                <li>
                  <Link href="/advertise">Advertise</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SleepDirectory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
