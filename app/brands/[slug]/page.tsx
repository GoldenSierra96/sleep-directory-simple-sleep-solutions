import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BrandOverviewPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
    include: { categories: true },
  });
  
  if (!brand) notFound();

  return (
    <div className="space-y-8">
      {/* Brand Description & Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Description */}
          <Card>
            <CardHeader>
              <CardTitle>About {brand.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{brand.description}</p>
            </CardContent>
          </Card>

          {/* Key Features & Tags */}
          {brand.tags && brand.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Links */}
          {brand.socialLinks && (
            <Card>
              <CardHeader>
                <CardTitle>Connect with {brand.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {(brand.socialLinks as any)?.instagram && (
                    <Link 
                      href={(brand.socialLinks as any).instagram} 
                      target="_blank" 
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Instagram
                    </Link>
                  )}
                  {(brand.socialLinks as any)?.facebook && (
                    <Link 
                      href={(brand.socialLinks as any).facebook} 
                      target="_blank" 
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Facebook
                    </Link>
                  )}
                  {(brand.socialLinks as any)?.tiktok && (
                    <Link 
                      href={(brand.socialLinks as any).tiktok} 
                      target="_blank" 
                      className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      TikTok
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Business Type</span>
                <Badge variant="outline">{brand.isOnline ? "Online Store" : "Physical Store"}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categories</span>
                <span className="font-medium">{brand.categories.length}</span>
              </div>
              {brand.locations && brand.locations.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Locations</span>
                  <span className="font-medium">{brand.locations.length}</span>
                </div>
              )}
              {brand.featured && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge>Featured Brand</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Gallery Preview */}
          {brand.productGallery && brand.productGallery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Product Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {brand.productGallery.slice(0, 4).map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt="Product" 
                      className="rounded border object-cover w-full h-24" 
                    />
                  ))}
                </div>
                {brand.productGallery.length > 4 && (
                  <Link 
                    href={`/brands/${brand.slug}/products`}
                    className="text-sm text-primary hover:underline mt-2 block"
                  >
                    View all {brand.productGallery.length} products →
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {brand.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/directory/categories/${cat.slug}`}
                    className="block p-2 rounded border hover:bg-muted transition-colors"
                  >
                    <div className="font-medium">{cat.name}</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 