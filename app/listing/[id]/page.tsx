import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Globe, Phone, Mail, Users, Award, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SeoSchema } from "@/components/seo-schema"

// This would typically come from a database or API
const getListingData = (id: string) => {
  const listings = {
    "1": {
      id: 1,
      name: "Purple Mattress",
      category: "Brand",
      type: "Mattress Manufacturer",
      rating: 4.8,
      reviews: 2847,
      location: "Alpine, Utah, USA",
      website: "purple.com",
      phone: "+1-888-848-2305",
      email: "support@purple.com",
      founded: "2015",
      employees: "500-1000",
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      description:
        "Purple revolutionized the mattress industry with their patented GelFlex Grid technology. This innovative design provides the perfect balance of comfort and support while maintaining optimal temperature regulation throughout the night.",
      fullDescription:
        "Founded in 2015 by brothers Tony and Terry Pearce, Purple has quickly become one of the most recognizable names in the sleep industry. Their unique approach combines scientific innovation with direct-to-consumer convenience, offering customers a 100-night sleep trial and free shipping. The company's flagship Purple Grid technology is made from a hyper-elastic polymer that flexes under pressure points while remaining firm where you need support.",
      features: [
        "Patented GelFlex Grid Technology",
        "Temperature Neutral Sleep Surface",
        "Pressure Point Relief",
        "100-Night Sleep Trial",
        "10-Year Warranty",
        "Free Shipping & Returns",
        "Made in USA",
      ],
      products: [
        "Purple Mattress Original",
        "Purple Hybrid Premier",
        "Purple RestorePremier",
        "Purple Pillows",
        "Purple Sheets",
        "Purple Platform Base",
      ],
      awards: [
        "Best Cooling Mattress 2023 - Sleep Foundation",
        "Editor's Choice - Good Housekeeping",
        "Best Online Mattress - Consumer Reports",
      ],
      tags: ["Memory Foam", "Cooling", "Online Direct", "Made in USA", "Sleep Trial"],
      socialProof: {
        totalCustomers: "1M+",
        satisfactionRate: "96%",
        returnRate: "4%",
      },
    },
  }

  return listings[id as keyof typeof listings] || null
}

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = getListingData(params.id)

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <Link href="/directory">
            <Button>Back to Directory</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Schema for Listing Detail */}
      <SeoSchema
        title={`${listing.name} - ${listing.type} | Sleep Directory`}
        description={listing.description}
        type="Product"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Directory", item: "/directory", position: 2 },
          { name: listing.category, item: `/directory/${listing.category.toLowerCase()}s`, position: 3 },
          { name: listing.name, item: `/listing/${listing.id}`, position: 4 },
        ]}
        productData={{
          name: listing.name,
          image: listing.image,
          description: listing.description,
          brand: listing.name,
          aggregateRating: {
            ratingValue: listing.rating,
            reviewCount: listing.reviews,
          },
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full" />
                <span className="text-2xl font-bold">SleepDirectory</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/directory" className="text-muted-foreground hover:text-foreground">
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

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/directory" className="hover:text-foreground">
              Directory
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{listing.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Section */}
              <Card className="mb-8">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image src={listing.image || "/placeholder.svg"} alt={listing.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">{listing.category}</Badge>
                      <CardTitle className="text-3xl mb-2">{listing.name}</CardTitle>
                      <CardDescription className="text-lg">{listing.type}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{listing.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{listing.reviews} reviews</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{listing.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>About {listing.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{listing.fullDescription}</p>

                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {listing.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {listing.products && (
                    <>
                      <h4 className="font-semibold mb-3">Products & Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        {listing.products.map((product, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {product}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {listing.awards && (
                    <>
                      <h4 className="font-semibold mb-3">Awards & Recognition</h4>
                      <div className="space-y-2">
                        {listing.awards.map((award, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Award className="h-4 w-4 text-yellow-500 mr-2" />
                            {award}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Gallery */}
              {listing.gallery && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {listing.gallery.map((image, index) => (
                        <div key={index} className="aspect-video relative overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${listing.name} gallery ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  {listing.website && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                      <a
                        href={`https://${listing.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {listing.website}
                      </a>
                    </div>
                  )}
                  {listing.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{listing.phone}</span>
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="text-sm">{listing.email}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Founded:</span>
                      <span>{listing.founded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Employees:</span>
                      <span>{listing.employees}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    {listing.website && (
                      <Button className="w-full mb-2" asChild>
                        <a href={`https://${listing.website}`} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full">
                      Contact Business
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              {listing.socialProof && (
                <Card>
                  <CardHeader>
                    <CardTitle>By the Numbers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{listing.socialProof.totalCustomers}</div>
                      <div className="text-sm text-muted-foreground">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{listing.socialProof.satisfactionRate}</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{listing.socialProof.returnRate}</div>
                      <div className="text-sm text-muted-foreground">Return Rate</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Compare Similar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share Listing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
