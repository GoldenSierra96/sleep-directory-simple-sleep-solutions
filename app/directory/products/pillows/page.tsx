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

export default function PillowsPage() {
  // Sample pillow products data
  const pillowProducts = [
    {
      id: 101,
      name: "Coop Home Goods Original",
      brand: "Coop Home Goods",
      type: "Shredded Memory Foam",
      rating: 4.8,
      reviews: 2156,
      price: 72,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Adjustable loft pillow with shredded memory foam filling that can be added or removed for personalized comfort.",
      features: ["Adjustable Fill", "Cooling Cover", "Hypoallergenic", "Machine Washable"],
      tags: ["Memory Foam", "Adjustable", "Cooling"],
    },
    {
      id: 102,
      name: "Tempur-Pedic TEMPUR-Cloud",
      brand: "Tempur-Pedic",
      type: "Memory Foam",
      rating: 4.7,
      reviews: 1423,
      price: 89,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Extra-soft feel with TEMPUR material that adapts to your head, neck, and shoulders for personalized comfort.",
      features: ["TEMPUR Material", "Extra-Soft Feel", "Washable Cover", "5-Year Warranty"],
      tags: ["Memory Foam", "Soft", "Premium"],
    },
    {
      id: 103,
      name: "Purple Harmony",
      brand: "Purple",
      type: "Latex Hybrid",
      rating: 4.6,
      reviews: 987,
      price: 179,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "The perfect balance of soft and supportive with Purple Grid Hex technology and responsive Talalay latex core.",
      features: ["Grid Hex Technology", "Talalay Latex", "Moisture-Wicking Cover", "100-Night Trial"],
      tags: ["Latex", "Cooling", "Premium"],
    },
    {
      id: 104,
      name: "Casper Original",
      brand: "Casper",
      type: "Down Alternative",
      rating: 4.5,
      reviews: 1245,
      price: 65,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Plush microfiber fill pillow with a 2-inch gusset that helps maintain its shape and provides proper neck alignment.",
      features: ["Microfiber Fill", "2-inch Gusset", "100% Cotton Cover", "Machine Washable"],
      tags: ["Down Alternative", "Medium Firmness", "Value"],
    },
    {
      id: 105,
      name: "Brooklinen Down",
      brand: "Brooklinen",
      type: "Down",
      rating: 4.7,
      reviews: 876,
      price: 109,
      image: "/placeholder.svg?height=200&width=300",
      description: "Luxurious Canadian white down pillow available in three densities for different sleep preferences.",
      features: ["Canadian White Down", "Multiple Densities", "400 Thread Count Cover", "1-Year Warranty"],
      tags: ["Down", "Luxury", "Multiple Options"],
    },
    {
      id: 106,
      name: "Layla Kapok",
      brand: "Layla",
      type: "Kapok and Memory Foam",
      rating: 4.6,
      reviews: 932,
      price: 99,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Blend of reactive memory foam and natural kapok fibers creates an airy, responsive feel with excellent support.",
      features: ["Kapok Fibers", "Shredded Memory Foam", "Copper-Infused Cover", "Adjustable Loft"],
      tags: ["Kapok", "Memory Foam", "Cooling"],
    },
  ]

  // Featured buying guides
  const buyingGuides = [
    {
      title: "How to Choose the Right Pillow for Your Sleep Position",
      excerpt: "Find the perfect pillow based on whether you're a side, back, or stomach sleeper.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/pillow-for-sleep-position",
    },
    {
      title: "Memory Foam vs. Down vs. Latex Pillows: A Comparison Guide",
      excerpt: "Understand the pros and cons of different pillow materials to find your perfect match.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/pillow-materials-comparison",
    },
    {
      title: "When to Replace Your Pillow: Signs It's Time for a New One",
      excerpt: "Learn how to tell when your pillow is no longer providing proper support.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/replace-pillow-guide",
    },
  ]

  return (
    <>
      {/* SEO Schema for Pillows Category */}
      <SeoSchema
        title="Pillows - Sleep Product Directory | Sleep Directory"
        description="Explore our comprehensive collection of pillows including memory foam, down, latex, and specialty options for all sleep positions and preferences."
        type="ItemList"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: "Products", item: "/directory/products", position: 3 },
          { name: "Pillows", item: "/directory/products/pillows", position: 4 },
        ]}
        items={pillowProducts.map((product, index) => ({
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
                <path d="M4 18v3" />
                <path d="M20 18v3" />
                <path d="M4 18h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z" />
                <path d="M12 4v4" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Pillows</h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Discover the perfect pillow for your sleep style. Our collection includes memory foam, down, down
            alternative, and specialty pillows designed for all sleep positions and preferences.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search pillows..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="memory-foam">Memory Foam</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                  <SelectItem value="down-alternative">Down Alternative</SelectItem>
                  <SelectItem value="latex">Latex</SelectItem>
                  <SelectItem value="specialty">Specialty</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sleep Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="side">Side Sleepers</SelectItem>
                  <SelectItem value="back">Back Sleepers</SelectItem>
                  <SelectItem value="stomach">Stomach Sleepers</SelectItem>
                  <SelectItem value="combination">Combination Sleepers</SelectItem>
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
              {pillowProducts.map((product) => (
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
              {pillowProducts.map((product) => (
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
                  {pillowProducts.map((product) => (
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
            <h2 className="text-2xl font-bold">Pillow Buying Guides</h2>
            <Link href="/blog/category/pillows">
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
                <CardTitle className="text-lg">How often should I replace my pillow?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most pillows should be replaced every 1-2 years. Memory foam pillows may last 2-3 years, while down
                  pillows can last up to 3-5 years with proper care. Signs it's time for a replacement include lumps,
                  permanent stains, and waking up with neck pain.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the best pillow for side sleepers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Side sleepers typically need a firmer, higher loft pillow (4-6 inches) to keep the head, neck, and
                  spine aligned. Memory foam, latex, or buckwheat pillows often work well for side sleepers due to their
                  supportive nature.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are cooling pillows worth it?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you tend to sleep hot or experience night sweats, cooling pillows can make a significant difference
                  in your sleep quality. Look for pillows with gel-infused memory foam, phase-change materials, or
                  natural materials like bamboo or cotton covers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I wash my pillow?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Washing instructions vary by pillow type. Many down and synthetic pillows are machine washable, while
                  memory foam pillows typically have removable covers that can be washed. Always check the care label
                  for specific instructions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Get Pillow Deals and Sleep Tips</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive exclusive pillow deals, new product alerts, and expert sleep advice.
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
