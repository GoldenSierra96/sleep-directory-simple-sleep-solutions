import { TabbedLayout, TabConfig } from "@/components/ui/tabbed-navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryData } from "../categoryData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: { category: string };
}

async function getCategoryData(categorySlug: string) {
  // Find the category data by matching the slug
  const data = Object.values(categoryData).find(category => category.slug === categorySlug);
  return data;
}

export default async function CategoryLayout({ children, params }: CategoryLayoutProps) {
  const category = await getCategoryData(params.category);

  if (!category) {
    notFound();
  }

  const basePath = `/directory/categories/${category.slug}`;

  // Define the tabs for category pages
  const tabs: TabConfig[] = [
    {
      key: "overview",
      label: "Overview",
      href: basePath,
    },
    {
      key: "products",
      label: "Products",
      href: `${basePath}/products`,
      count: category.products?.length || 0,
    },
    {
      key: "brands",
      label: "Brands",
      href: `${basePath}/brands`,
    },
    {
      key: "buying-guide",
      label: "Buying Guide",
      href: `${basePath}/buying-guide`,
    },
    {
      key: "reviews",
      label: "Reviews",
      href: `${basePath}/reviews`,
    },
    {
      key: "science",
      label: "Sleep Science",
      href: `${basePath}/science`,
    },
  ];

  // Header content with category info
  const headerContent = (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          Search Products
        </Button>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <Button asChild>
        <Link href={`/directory/products?category=${category.slug}`}>
          View All Products
        </Link>
      </Button>
    </div>
  );

  return (
    <TabbedLayout
      tabs={tabs}
      basePath={basePath}
      title={category.title}
      description={category.tagline}
      headerContent={headerContent}
    >
      {children}
    </TabbedLayout>
  );
} 