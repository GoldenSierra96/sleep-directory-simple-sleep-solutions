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

export default function SleepMasksPage() {
  // Sample sleep mask products data
  const sleepMaskProducts = [
    {
      id: 501,
      name: "Manta Sleep Mask",
      brand: "Manta Sleep",
      type: "Contoured Mask",
      rating: 4.9,
      reviews: 2156,
      price: 35,
      image: "/placeholder.svg?height=200&width=300",
      description: "Adjustable eye cups with 100% blackout design for customized eye comfort and complete darkness.",
      features: ["Adjustable Eye Cups", "100% Blackout", "Zero Eye Pressure", "Machine Washable"],
      tags: ["Contoured", "Adjustable", "Blackout"],
    },
    {
      id: 502,
      name: "Nodpod Weighted Sleep Mask",
      brand: "Nodpod",
      type: "Weighted Mask",
      rating: 4.7,
      reviews: 1423,
      price: 34,
      image: "/placeholder.svg?height=200&width=300",
      description: "Gentle weighted sleep mask with microbeads that provides gentle pressure for deeper relaxation.",
      features: ["Gentle Weight", "Cooling/Warming Options", "Contoured Nose Gap", "Pull-Through Design"],
      tags: ["Weighted", "Microbead", "Versatile"],
    },
    {
      id: 503,
      name: "Alaska Bear Natural Silk Sleep Mask",
      brand: "Alaska Bear",
      type: "Silk Mask",
      rating: 4.8,
      reviews: 12847,
      price: 10,
      image: "/placeholder.svg?height=200&width=300",
      description: "100% natural mulberry silk sleep mask that's soft, breathable, and gentle on skin and hair.",
      features: ["100% Mulberry Silk", "Adjustable Strap", "Lightweight", "Hypoallergenic"],
      tags: ["Silk", "Lightweight", "Budget-Friendly"],
    },
    {
      id: 504,
      name: "Gravity Weighted Sleep Mask",
      brand: "Gravity",
      type: "Weighted Mask",
      rating: 4.6,
      reviews: 876,
      price: 40,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Weighted sleep mask with even distribution of glass beads to provide gentle pressure for relaxation.",
      features: ["Evenly Distributed Weight", "Plush Velvet", "Adjustable Strap", "Removable Cover"],
      tags: ["Weighted", "Premium", "Relaxation"],
    },
    {
      id: 505,
      name: "IMAK Compression Pain Relief Mask",
      brand: "IMAK",
      type: "Compression Mask",
      rating: 4.5,
      reviews: 3421,
      price: 14,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Ergobeads provide gentle massage and acupressure while blocking out light for headache and migraine relief.",
      features: ["Ergobeads Technology", "Cold Therapy", "Contoured Design", "Doctor Designed"],
      tags: ["Compression", "Pain Relief", "Cooling"],
    },
    {
      id: 506,
      name: "Ostrichpillow Eye Mask",
      brand: "Ostrichpillow",
      type: "Ergonomic Mask",
      rating: 4.7,
      reviews: 543,
      price: 45,
      image: "/placeholder.svg?height=200&width=300",
      description: "Ergonomic 3D design with six different layers for total blackout and ultimate comfort.",
      features: ["Ergonomic 3D Design", "6-Layer Construction", "Total Blackout", "Adjustable Strap"],
      tags: ["Ergonomic", "Premium", "Blackout"],
    },
  ]

  // Featured buying guides
  const buyingGuides = [
    {
      title: "How to Choose the Perfect Sleep Mask for Your Needs",
      excerpt: "Find the ideal sleep mask based on your sleep style, comfort preferences, and light-blocking needs.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/choosing-sleep-mask",
    },
    {
      title: "Weighted Sleep Masks: Benefits and Top Picks",
      excerpt: "Learn how weighted sleep masks can improve sleep quality and which ones offer the best features.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/weighted-sleep-masks",
    },
    {
      title: "Sleep Masks for Travel: The Ultimate Guide",
      excerpt: "Discover the best sleep masks for planes, trains, and other travel situations.",
      image: "/placeholder.svg?height=150&width=250",
      href: "/blog/travel-sleep-masks",
    },
  ]

  return (
    <>
      {/* SEO Schema for Sleep Masks Category */}
      <SeoSchema
        title="Sleep Masks and Eye Covers - Sleep Product Directory | Sleep Directory"
        description="Explore our comprehensive collection of sleep masks and eye covers including blackout, weighted, silk, and specialty options for better sleep."
        type="ItemList"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: "Products", item: "/directory/products", position: 3 },
          { name: "Sleep Masks and Eye Covers", item: "/directory/products/sleep-masks-and-eye-covers", position: 4 },
        ]}
        items={sleepMaskProducts.map((product, index) => ({
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
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Sleep Masks and Eye Covers</h1>
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Discover the perfect sleep mask to block out light and improve your sleep quality. Our collection includes
            blackout masks, weighted options, silk masks, and specialty designs for various needs.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search sleep masks..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contoured">Contoured</SelectItem>
                  <SelectItem value="weighted">Weighted</SelectItem>
                  <SelectItem value="silk">Silk</SelectItem>
                  <SelectItem value="compression">Compression</SelectItem>
                  <SelectItem value="cooling">Cooling</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-15">Under $15</SelectItem>
                  <SelectItem value="15-30">$15 - $30</SelectItem>
                  <SelectItem value="over-30">Over $30</SelectItem>
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
              {sleepMaskProducts.map((product) => (
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
              {sleepMaskProducts.map((product) => (
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
                  {sleepMaskProducts.map((product) => (
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
            <h2 className="text-2xl font-bold">Sleep Mask Buying Guides</h2>
            <Link href="/blog/category/sleep-masks">
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
                <CardTitle className="text-lg">Are sleep masks good for your eyes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sleep masks are generally safe for your eyes and can be beneficial by blocking out light that disrupts
                  melatonin production. Look for masks that don't put pressure directly on your eyes and are made from
                  breathable, hypoallergenic materials.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the benefits of weighted sleep masks?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Weighted sleep masks apply gentle pressure that can trigger the release of serotonin and melatonin,
                  helping you relax and fall asleep faster. They may also help reduce anxiety and provide relief for
                  headaches and migraines.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I clean my sleep mask?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cleaning instructions vary by material. Silk masks typically require hand washing with mild soap.
                  Cotton masks can usually be machine washed on gentle cycle. Weighted or specialty masks often have
                  removable covers that can be washed separately. Always check the manufacturer's care instructions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can sleep masks help with insomnia?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sleep masks can help with insomnia by blocking out light, which signals to your brain that it's time
                  to sleep by increasing melatonin production. They're particularly helpful for people sensitive to
                  light or those who sleep during daylight hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Get Sleep Mask Deals and Sleep Tips</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive exclusive sleep mask deals, new product alerts, and expert sleep advice.
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
