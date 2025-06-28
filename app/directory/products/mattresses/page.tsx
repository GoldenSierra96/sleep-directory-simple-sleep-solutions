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

export default function MattressesPage() {
  // Sample mattress products data
  const mattressProducts = [
    {
      id: 1,
      name: "Purple Hybrid Premier",
      brand: "Purple",
      type: "Hybrid",
      rating: 4.8,
      reviews: 1247,
      price: 2299,
      image: "/placeholder.svg?height=200&width=300",
      description: "Premium hybrid mattress with Purple's GelFlex Grid for pressure relief and cooling.",
      features: ["GelFlex Grid", "Responsive Coils", "Cooling Technology", "Motion Isolation"],
      tags: ["Hybrid", "Cooling", "Premium"],
    },
    {
      id: 2,
      name: "Tempur-Pedic TEMPUR-ProAdapt",
      brand: "Tempur-Pedic",
      type: "Memory Foam",
      rating: 4.7,
      reviews: 982,
      price: 2999,
      image: "/placeholder.svg?height=200&width=300",
      description: "Advanced pressure relief with TEMPUR material that adapts to your body shape and temperature.",
      features: ["TEMPUR Material", "Cool-to-Touch Cover", "Motion Absorption", "Pressure Relief"],
      tags: ["Memory Foam", "Luxury", "Cooling"],
    },
    {
      id: 3,
      name: "Saatva Classic",
      brand: "Saatva",
      type: "Innerspring",
      rating: 4.9,
      reviews: 2156,
      price: 1699,
      image: "/placeholder.svg?height=200&width=300",
      description: "Luxury innerspring mattress with Euro pillow top and dual coil system for durability and comfort.",
      features: ["Euro Pillow Top", "Dual Coil System", "Lumbar Support", "Edge Support"],
      tags: ["Innerspring", "Luxury", "Eco-Friendly"],
    },
    {
      id: 4,
      name: "Nectar Memory Foam",
      brand: "Nectar",
      type: "Memory Foam",
      rating: 4.6,
      reviews: 3421,
      price: 899,
      image: "/placeholder.svg?height=200&width=300",
      description: "Medium-firm memory foam mattress with cooling gel and pressure-relieving support.",
      features: ["Gel Memory Foam", "Quilted Cover", "Adaptive Response", "Minimal Motion Transfer"],
      tags: ["Memory Foam", "Value", "365-Night Trial"],
    },
    {
      id: 5,
      name: "Helix Midnight Luxe",
      brand: "Helix",
      type: "Hybrid",
      rating: 4.7,
      reviews: 1123,
      price: 1949,
      image: "/placeholder.svg?height=200&width=300",
      description: "Premium hybrid designed for side sleepers with zoned lumbar support and cooling pillow top.",
      features: ["Zoned Lumbar Support", "Premium Pillow Top", "Wrapped Coils", "Breathable Cover"],
      tags: ["Hybrid", "Side Sleepers", "Cooling"],
    },
    {
      id: 6,
      name: "Avocado Green",
      brand: "Avocado",
      type: "Hybrid",
      rating: 4.7,
      reviews: 1578,
      price: 1699,
      image: "/placeholder.svg?height=200&width=300",
      description: "Organic hybrid mattress with natural latex, wool, cotton, and up to 1,414 pocketed support coils.",
      features: ["GOLS Organic Latex", "GOTS Organic Cotton", "Pocketed Coils", "Needle-tufted"],
      tags: ["Organic", "Eco-Friendly", "Natural"],
    },
  ]

  // Featured buying guides
  const buyingGuides = [
    {
      title: "How to Choose the Perfect Mattress for Your Sleep Position",
      excerpt: "Learn which mattress types work best for side, back, and stomach sleepers.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/mattress-for-sleep-position",
    },
    {
      title: "Memory Foam vs. Hybrid vs. Innerspring: Which is Right for You?",
      excerpt: "Compare the pros and cons of the most popular mattress types.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/mattress-types-comparison",
    },
    {
      title: "Understanding Mattress Firmness: The Complete Guide",
      excerpt: "Decode firmness ratings and find your ideal comfort level.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/mattress-firmness-guide",
    },
  ]

  return (
    <>
      {/* SEO Schema for Mattresses Category */}
      <SeoSchema
        title="Mattresses - Sleep Product Directory | Sleep Directory"
        description="Explore our comprehensive collection of mattresses including memory foam, hybrid, innerspring, and latex options for all sleep positions and preferences."
        type="ItemList"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: "Products", item: "/directory/products", position: 3 },
          { name: "Mattresses", item: "/directory/products/mattresses", position: 4 },
        ]}
        items={mattressProducts.map((product, index) => ({
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
            <h1 className="text-3xl font-bold">Mattresses</h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Explore our comprehensive collection of mattresses including memory foam, hybrid, innerspring, and latex
            options for all sleep positions and preferences. Find the perfect mattress for your best night's sleep.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search mattresses..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="memory-foam">Memory Foam</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="innerspring">Innerspring</SelectItem>
                  <SelectItem value="latex">Latex</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Firmness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Firmness</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="firm">Firm</SelectItem>
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
              {mattressProducts.map((product) => (
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
              {mattressProducts.map((product) => (
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
                  {mattressProducts.map((product) => (
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
            <h2 className="text-2xl font-bold">Mattress Buying Guides</h2>
            <Link href="/blog/category/mattresses">
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
                <CardTitle className="text-lg">How often should I replace my mattress?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most mattresses should be replaced every 7-10 years, depending on the quality and type. Signs it's
                  time for a replacement include sagging, lumps, noisy springs, increased allergies, or waking up with
                  aches and pains.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the best mattress for back pain?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Medium-firm to firm mattresses typically provide the best support for back pain sufferers. Look for
                  options with good lumbar support, pressure relief, and proper spinal alignment features. Memory foam
                  and hybrid mattresses often work well.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What mattress type sleeps the coolest?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Innerspring and hybrid mattresses typically sleep cooler than all-foam options due to better airflow.
                  Look for mattresses with cooling technologies like gel-infused foam, phase-change materials, or
                  breathable covers if you sleep hot.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are more expensive mattresses worth it?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Higher-priced mattresses often use better quality materials that provide improved durability, comfort,
                  and support. However, many mid-range mattresses offer excellent value. Focus on finding the right
                  mattress for your specific needs rather than price alone.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Get Mattress Deals and Sleep Tips</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive exclusive mattress deals, new product alerts, and expert sleep advice.
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
