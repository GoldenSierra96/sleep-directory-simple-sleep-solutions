import { categoryData } from "../../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoryProductsPageProps {
  params: {
    category: string;
  };
}

export default function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  // Mock product data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: "Premium Memory Foam Mattress",
      brand: "SleepWell",
      price: 899,
      originalPrice: 1199,
      rating: 4.8,
      reviewCount: 245,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Memory Foam", "Cooling Gel", "10-Year Warranty"],
      tags: ["Best Seller", "Editor's Choice"],
    },
    {
      id: 2,
      name: "Organic Cotton Pillow Set",
      brand: "EcoSleep",
      price: 159,
      rating: 4.6,
      reviewCount: 128,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Organic Cotton", "Hypoallergenic", "Machine Washable"],
      tags: ["Eco-Friendly"],
    },
    {
      id: 3,
      name: "Smart Sleep Tracker",
      brand: "TechSleep",
      price: 299,
      rating: 4.4,
      reviewCount: 89,
      image: "/placeholder.svg?height=200&width=300",
      features: ["Sleep Monitoring", "App Integration", "30-Day Battery"],
      tags: ["New Arrival", "Smart Tech"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder={`Search ${data.title.toLowerCase()}...`}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Under £100</SelectItem>
                  <SelectItem value="100-500">£100 - £500</SelectItem>
                  <SelectItem value="500-1000">£500 - £1000</SelectItem>
                  <SelectItem value="over-1000">Over £1000</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">All {data.title}</Badge>
            <Badge variant="outline">Free Shipping</Badge>
            <Badge variant="outline">In Stock</Badge>
            <Badge variant="outline">4+ Stars</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {mockProducts.length} Products Found
          </h2>
          <p className="text-muted-foreground">
            Browse our curated selection of {data.title.toLowerCase()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">{product.brand}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {product.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {product.features.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.features.length - 2} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">£{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      £{product.originalPrice}
                    </span>
                  )}
                </div>
                <Button size="sm" asChild>
                  <Link href={`/products/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>

      {/* Category Sub-niches */}
      {data.subNiches && data.subNiches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Shop by Sub-category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.subNiches.map((subNiche, index) => (
                <Link
                  key={index}
                  href={`/directory/categories/${data.slug}?subcategory=${subNiche.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-center"
                >
                  <h4 className="font-medium mb-1">{subNiche.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {subNiche.description}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 