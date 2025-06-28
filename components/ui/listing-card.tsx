import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ProductWithRelations } from "@/lib/types"

interface ListingCardProps {
  product: ProductWithRelations
  variant?: "grid" | "list"
  showActions?: boolean
}

export function ListingCard({ product, variant = "grid", showActions = true }: ListingCardProps) {
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : product.rating || 0

  if (variant === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 h-48 relative flex-shrink-0">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.categories[0]?.name}
                </Badge>
                <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.brand.name}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>
                {product.price && <div className="text-lg font-bold">${product.price}</div>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

            {product.features.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/products/${product.slug}`}>
                <Button>View Details</Button>
              </Link>
              {showActions && (
                <>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isFeatured && <Badge className="absolute top-2 left-2">Featured</Badge>}
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{product.categories[0]?.name}</Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
          <CardTitle className="mt-2 line-clamp-2">{product.name}</CardTitle>
          <CardDescription>{product.brand.name}</CardDescription>
        </CardHeader>
        <CardContent>
          {product.price && <div className="text-lg font-bold mb-2">${product.price}</div>}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          {showActions && (
            <div className="flex items-center gap-2">
              <Button className="flex-1" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
