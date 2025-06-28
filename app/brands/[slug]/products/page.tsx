import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function BrandProductsPage({ params }: { params: { slug: string } }) {
  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
    include: { 
      categories: true,
      // When you add product relations:
      // products: {
      //   include: {
      //     category: true,
      //   }
      // }
    },
  });
  
  if (!brand) notFound();

  return (
    <div className="space-y-8">
      {/* Product Gallery */}
      {brand.productGallery && brand.productGallery.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.productGallery.map((img, i) => (
                <div key={i} className="relative group">
                  <img 
                    src={img} 
                    alt="Product" 
                    className="rounded-lg border object-cover w-full h-48 group-hover:opacity-90 transition-opacity" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      Explore {category.name.toLowerCase()} from {brand.name}
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/directory/categories/${category.slug}?brand=${brand.slug}`}>
                      View Products
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Products Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Detailed product listings coming soon! In the meantime, visit the brand's website to explore their full product range.
            </p>
            {brand.websiteUrl && (
              <Button asChild>
                <Link href={brand.websiteUrl} target="_blank">
                  Shop {brand.name} Products
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Search & Filters Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Product Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Advanced product search and filtering capabilities will be available here, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Filter by price range</li>
              <li>Sort by popularity, price, or rating</li>
              <li>Filter by specific features and certifications</li>
              <li>Compare similar products</li>
              <li>Customer review integration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 