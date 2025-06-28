import { CollectionPage } from "@/components/CollectionPage";
import { categoryData } from "../categoryData";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryOverviewPage({ params }: CategoryPageProps) {
  // Find the category data by matching the slug
  const data = Object.values(categoryData).find(category => category.slug === params.category);
  
  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">Browse Products</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Explore {data.products?.length || 0}+ products
            </p>
            <Button size="sm" asChild>
              <Link href={`/directory/categories/${data.slug}/products`}>
                View Products
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">Top Brands</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Discover leading brands
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/directory/categories/${data.slug}/brands`}>
                View Brands
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">Buying Guide</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Expert purchasing advice
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/directory/categories/${data.slug}/buying-guide`}>
                Read Guide
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">Sleep Science</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Research & insights
            </p>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/directory/categories/${data.slug}/science`}>
                Learn More
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Use existing CollectionPage component for the main content */}
      <div className="[&>div]:bg-transparent [&>div]:py-0">
        <CollectionPage data={data} />
      </div>
    </div>
  );
} 