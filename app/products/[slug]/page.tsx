import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ExternalLink, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SeoSchema } from "@/components/seo-schema"
import { ListingCard } from "@/components/ui/listing-card"

// This would typically come from your API
async function getProduct(slug: string) {
  // Mock data - replace with actual API call
  return {
    id: "1",
    name: "Purple Hybrid Premier",
    slug: "purple-hybrid-premier",
    brand: {
      id: "1",
      name: "Purple",
      slug: "purple",
      logo: "/placeholder.svg",
      websiteUrl: "https://purple.com",
    },
    categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
    description:
      "The Purple Hybrid Premier combines Purple's innovative GelFlex Grid with responsive coils for the perfect balance of comfort and support.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    price: 2299,
    rating: 4.8,
    reviewCount: 1247,
    features: [
      "GelFlex Grid Technology",
      "Responsive Coils",
      "Cooling Technology",
      "Motion Isolation",
      "100-Night Trial",
      "10-Year Warranty",
    ],
    url: "https://purple.com/mattresses/purple-hybrid-premier",
    tags: ["Hybrid", "Cooling", "Premium"],
    reviews: [
      {
        id: "1",
        rating: 5,
        title: "Amazing mattress!",
        content: "Best sleep I've had in years. The cooling technology really works.",
        author: {
          id: "1",
          name: "John Doe",
          username: "johndoe",
          avatarUrl: "/placeholder.svg",
        },
        createdAt: "2024-01-15T00:00:00Z",
      },
    ],
  }
}

async function getRelatedProducts(categorySlug: string, currentProductId: string) {
  // Mock data - replace with actual API call
  return [
    {
      id: "2",
      name: "Purple Mattress Original",
      slug: "purple-mattress-original",
      brand: { id: "1", name: "Purple", slug: "purple" },
      categories: [{ id: "1", name: "Mattresses", slug: "mattresses" }],
      description: "The original Purple mattress with GelFlex Grid technology.",
      images: ["/placeholder.svg?height=200&width=300"],
      price: 1299,
      rating: 4.6,
      reviewCount: 2847,
      features: ["GelFlex Grid", "Cooling", "Pressure Relief"],
      tags: ["Memory Foam", "Cooling"],
      reviews: [],
    },
  ]
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categories[0].slug, product.id)

  return (
    <>
      <SeoSchema
        title={`${product.name} - ${product.brand.name} | Sleep Directory`}
        description={product.description}
        type="Product"
        breadcrumbs={[
          { name: "Home", item: "/", position: 1 },
          { name: "Products", item: "/products", position: 2 },
          { name: product.categories[0].name, item: `/products?categories=${product.categories[0].slug}`, position: 3 },
          { name: product.name, item: `/products/${product.slug}`, position: 4 },
        ]}
        productData={{
          name: product.name,
          image: product.images[0],
          description: product.description,
          brand: product.brand.name,
          offers: {
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/50">
          <div className="container mx-auto px-4 py-3">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-foreground">
                Products
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/products?categories=${product.categories[0].slug}`} className="hover:text-foreground">
                {product.categories[0].name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Product Hero */}
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Gallery */}
                  <div>
                    <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.images.slice(1, 4).map((image, index) => (
                        <div key={index} className="aspect-square relative overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${product.name} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{product.categories[0].name}</Badge>
                      <Badge variant="outline">{product.brand.name}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-semibold">{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold mb-6">${product.price}</div>

                    <p className="text-muted-foreground mb-6">{product.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3 mb-6">
                      <Button size="lg" className="flex-1">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Buy Now
                      </Button>
                      <Button variant="outline" size="lg">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="lg">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>

                    {product.url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={product.url} target="_blank" rel="noopener noreferrer">
                          Visit {product.brand.name} Website
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Details Tabs */}
              <Tabs defaultValue="features" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <Card key={review.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="font-semibold">{review.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{review.author.name}</span>
                                <span>•</span>
                                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p>{review.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Brand</h4>
                          <p className="text-muted-foreground">{product.brand.name}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Category</h4>
                          <p className="text-muted-foreground">{product.categories[0].name}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Price</h4>
                          <p className="text-muted-foreground">${product.price}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Rating</h4>
                          <p className="text-muted-foreground">
                            {product.rating}/5 ({product.reviewCount} reviews)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Brand Info */}
              <Card>
                <CardHeader>
                  <CardTitle>About {product.brand.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={product.brand.logo || "/placeholder.svg"}
                        alt={product.brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{product.brand.name}</h4>
                      <p className="text-sm text-muted-foreground">Sleep Innovation Leader</p>
                    </div>
                  </div>
                  {product.brand.websiteUrl && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={product.brand.websiteUrl} target="_blank" rel="noopener noreferrer">
                        Visit Brand Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Write a Review
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Product
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </CardContent>
              </Card>

              {/* Product Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{product.rating}</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{product.reviewCount}</div>
                    <div className="text-sm text-muted-foreground">Total Reviews</div>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">${product.price}</div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ListingCard key={relatedProduct.id} product={relatedProduct} variant="grid" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
