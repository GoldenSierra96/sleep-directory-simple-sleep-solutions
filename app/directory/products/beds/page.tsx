import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SeoSchema } from "@/components/seo-schema"

export default function BedsPage() {
  // Sample bed products data
  const bedProducts = [
    {
      id: 201,
      name: "Thuma The Bed",
      brand: "Thuma",
      type: "Platform Bed",
      rating: 4.9,
      reviews: 1856,
      price: 1095,
      image: "/placeholder.svg?height=200&width=300",
      description: "Minimalist Japanese-inspired platform bed with solid wood frame and PillowBoard headboard.",
      features: ["Solid Wood Frame", "Tool-Free Assembly", "Noise-Free Design", "Eco-Friendly Materials"],
      tags: ["Platform Bed", "Wooden", "Minimalist"],
    },
    {
      id: 202,
      name: "Casper Haven Bed Frame",
      brand: "Casper",
      type: "Upholstered Bed",
      rating: 4.7,
      reviews: 723,
      price: 1895,
      image: "/placeholder.svg?height=200&width=300",
      description: "Plush upholstered bed frame with oak legs and a cushioned headboard for comfort and style.",
      features: ["Upholstered Headboard", "Solid Oak Legs", "No Box Spring Needed", "5-Year Warranty"],
      tags: ["Upholstered", "Modern", "Premium"],
    },
    {
      id: 203,
      name: "Purple Platform Base",
      brand: "Purple",
      type: "Platform Base",
      rating: 4.6,
      reviews: 512,
      price: 450,
      image: "/placeholder.svg?height=200&width=300",
      description: "Simple, sturdy platform base designed specifically to support Purple mattresses.",
      features: ["Easy Assembly", "Reinforced Center Support", "Breathable Design", "100-Night Trial"],
      tags: ["Platform Base", "Simple", "Sturdy"],
    },
    {
      id: 204,
      name: "Nectar Adjustable Base",
      brand: "Nectar",
      type: "Adjustable Base",
      rating: 4.8,
      reviews: 1245,
      price: 799,
      image: "/placeholder.svg?height=200&width=300",
      description: "Three-zone adjustable base with wireless remote, USB ports, and under-bed lighting.",
      features: ["Zero Gravity Position", "TV Recline Setting", "USB Charging Ports", "Under-Bed Lighting"],
      tags: ["Adjustable", "Smart Features", "USB Ports"],
    },
    {
      id: 205,
      name: "Avocado City Bed Frame",
      brand: "Avocado",
      type: "Wooden Bed Frame",
      rating: 4.7,
      reviews: 432,
      price: 1299,
      image: "/placeholder.svg?height=200&width=300",
      description: "Handcrafted solid wood bed frame made from sustainable, reclaimed wood with a natural finish.",
      features: ["Reclaimed Wood", "Handcrafted", "Zero VOC Finish", "25-Year Warranty"],
      tags: ["Wooden", "Eco-Friendly", "Sustainable"],
    },
    {
      id: 206,
      name: "Saatva Lineal Adjustable Base",
      brand: "Saatva",
      type: "Adjustable Base",
      rating: 4.8,
      reviews: 876,
      price: 1399,
      image: "/placeholder.svg?height=200&width=300",
      description: "Luxury adjustable base with full-body massage, under-bed illumination, and wall-hugging design.",
      features: ["Full-Body Massage", "Wall-Hugging Design", "One-Touch Presets", "Quiet Motor"],
      tags: ["Adjustable", "Massage", "Luxury"],
    },
  ]

  // Featured buying guides
  const buyingGuides = [
    {
      title: "Platform vs. Box Spring: Which Bed Base is Right for You?",
      excerpt: "Learn the pros and cons of different bed foundations and which works best for your mattress type.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/platform-vs-box-spring",
    },
    {
      title: "Adjustable Bed Bases: Are They Worth the Investment?",
      excerpt: "Discover the health benefits and lifestyle improvements that come with an adjustable bed base.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/adjustable-bed-benefits",
    },
    {
      title: "How to Choose the Perfect Bed Frame for Your Bedroom",
      excerpt: "Find the ideal bed frame based on your room size, style preferences, and storage needs.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/choosing-bed-frame",
    },
  ]

  return (
    <>
      {/* SEO Schema for Beds Category */}
      <SeoSchema
        title="Beds - Sleep Product Directory | Sleep Directory"
        description="Explore our comprehensive collection of bed frames, adjustable bases, platform beds, and more for your bedroom."
        type="ItemList"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: "Products", item: "/directory/products", position: 3 },
          { name: "Beds", item: "/directory/products/beds", position: 4 },
        ]}
        items={bedProducts.map((product, index) => ({
          name: product.name,
          url: `/listing/${product.id}`,
          image: product.image,
          description: product.description,
          position: index + 1,
        }))}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M2 4v16" />
                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                <path d="M2 17h20" />
                <path d="M6 8v9" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Beds</h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Explore our collection of bed frames, adjustable bases, platform beds, and more. Find the perfect foundation
            for your mattress and bedroom style.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search beds..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="platform">Platform Beds</SelectItem>
                  <SelectItem value="adjustable">Adjustable Bases</SelectItem>
                  <SelectItem value="upholstered">Upholstered Beds</SelectItem>
                  <SelectItem value="wooden">Wooden Beds</SelectItem>
                  <SelectItem value="storage">Storage Beds</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1000</SelectItem>
                  <SelectItem value="1000-1500">$1000 - $1500</SelectItem>
                  <SelectItem value="over-1500">Over $1500</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            <Select defaultValue="featured">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid View */}
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bedProducts.map((product) => (
                <Link key={product.id} href={`/listing/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{product.type}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2">{product.name}</CardTitle>
                      <CardDescription>{product.brand}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold mb-2">${product.price}</div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="mt-0">
            <div className="space-y-6">
              {bedProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 relative flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {product.type}
                          </Badge>
                          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">({product.reviews})</span>
                          </div>
                          <div className="text-lg font-bold">${product.price}</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {product.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/listing/${product.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compare View */}
          <TabsContent value="compare" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Type</th>
                    <th className="text-left p-4 font-medium">Price</th>
                    <th className="text-left p-4 font-medium">Rating</th>
                    <th className="text-left p-4 font-medium">Features</th>
                    <th className="text-left p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bedProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 relative flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{product.type}</td>
                      <td className="p-4 font-medium">${product.price}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <ul className="space-y-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                          {product.features.length > 2 && (
                            <li className="text-sm text-muted-foreground">+ {product.features.length - 2} more</li>
                          )}
                        </ul>
                      </td>
                      <td className="p-4">
                        <Link href={`/listing/${product.id}`}>
                          <Button size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Buying Guides */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Bed Buying Guides</h2>
            <Link href="/blog/category/beds">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyingGuides.map((guide, index) => (
              <Link key={index} href={guide.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{guide.excerpt}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need a box spring with a platform bed?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No, platform beds are designed to support your mattress without a box spring. They typically have a
                  solid surface or closely spaced slats that provide adequate support for most mattress types.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are adjustable beds worth the investment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adjustable beds can be worth the investment for people with certain health conditions like sleep
                  apnea, acid reflux, or back pain. They also offer lifestyle benefits like comfortable reading, TV
                  watching, and improved circulation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the ideal bed height?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The ideal bed height is typically 24-25 inches from the floor to the top of the mattress. This allows
                  most people to sit on the edge with their feet flat on the floor and knees at a 90-degree angle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How much weight can a platform bed support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most quality platform beds can support 1,000-1,500 pounds, including the mattress and sleepers.
                  However, weight capacity varies by design and materials, so always check the manufacturer's
                  specifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Get Bed Frame Deals and Sleep Tips</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive exclusive bed frame deals, new product alerts, and expert sleep advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </>
  )
}
