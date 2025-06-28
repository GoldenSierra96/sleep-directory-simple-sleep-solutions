import { categoryData } from "../../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryBrandsPageProps {
  params: {
    category: string;
  };
}

export default function CategoryBrandsPage({ params }: CategoryBrandsPageProps) {
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  // Mock brand data for demonstration
  const mockBrands = [
    {
      id: 1,
      name: "SleepWell Innovations",
      slug: "sleepwell-innovations",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Premium sleep solutions with cutting-edge technology and sustainable materials.",
      rating: 4.8,
      reviewCount: 1247,
      productCount: 24,
      founded: "2015",
      locations: ["London", "Manchester", "Birmingham"],
      tags: ["Premium", "Eco-Friendly", "Award-Winning"],
      featured: true,
      websiteUrl: "https://sleepwell.com",
    },
    {
      id: 2,
      name: "EcoSleep",
      slug: "ecosleep",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Organic and sustainable sleep products for environmentally conscious consumers.",
      rating: 4.6,
      reviewCount: 892,
      productCount: 18,
      founded: "2018",
      locations: ["Online Only"],
      tags: ["Organic", "Sustainable", "Certified"],
      featured: false,
      websiteUrl: "https://ecosleep.co.uk",
    },
    {
      id: 3,
      name: "TechSleep",
      slug: "techsleep",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Smart sleep technology and monitoring solutions for better rest.",
      rating: 4.4,
      reviewCount: 654,
      productCount: 12,
      founded: "2020",
      locations: ["Edinburgh", "Glasgow"],
      tags: ["Smart Tech", "Innovation", "Monitoring"],
      featured: false,
      websiteUrl: "https://techsleep.com",
    },
  ];

  const featuredBrands = mockBrands.filter(brand => brand.featured);
  const allBrands = mockBrands.filter(brand => !brand.featured);

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder={`Search brands for ${data.title.toLowerCase()}...`}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">All Brands</Badge>
              <Badge variant="outline">Featured</Badge>
              <Badge variant="outline">Premium</Badge>
              <Badge variant="outline">Eco-Friendly</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Brands */}
      {featuredBrands.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Featured Brands</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredBrands.map((brand) => (
              <Card key={brand.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{brand.name}</h3>
                        <Badge>Featured</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{brand.rating}</span>
                          <span className="text-muted-foreground text-sm">
                            ({brand.reviewCount} reviews)
                          </span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {brand.productCount} products
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {brand.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {brand.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{brand.locations.join(", ")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={brand.websiteUrl} target="_blank">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/brands/${brand.slug}`}>
                              View Brand
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Brands */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          All {data.title} Brands ({mockBrands.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBrands.map((brand) => (
            <Card key={brand.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{brand.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{brand.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({brand.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {brand.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {brand.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {brand.productCount} products
                  </span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/brands/${brand.slug}`}>
                      View Brand
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Brand Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Compare Top Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Brand</th>
                  <th className="text-left py-2">Rating</th>
                  <th className="text-left py-2">Products</th>
                  <th className="text-left py-2">Founded</th>
                  <th className="text-left py-2">Specialty</th>
                </tr>
              </thead>
              <tbody>
                {mockBrands.slice(0, 3).map((brand) => (
                  <tr key={brand.id} className="border-b last:border-b-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 relative">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="font-medium">{brand.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{brand.rating}</span>
                      </div>
                    </td>
                    <td className="py-3">{brand.productCount}</td>
                    <td className="py-3">{brand.founded}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-xs">
                        {brand.tags[0]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 