import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { TabbedLayout, TabConfig } from "@/components/ui/tabbed-navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface BrandLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

async function getBrand(slug: string) {
  const brand = await prisma.brand.findUnique({
    where: { slug },
    include: { 
      categories: true,
      _count: {
        select: {
          // Add these counts when you have the relations set up
          // products: true,
          // reviews: true,
        }
      }
    },
  });
  return brand;
}

export default async function BrandLayout({ children, params }: BrandLayoutProps) {
  const brand = await getBrand(params.slug);

  if (!brand) {
    notFound();
  }

  const basePath = `/brands/${brand.slug}`;

  // Define the tabs for brand pages
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
      // count: brand._count.products, // Uncomment when relation exists
    },
    {
      key: "reviews",
      label: "Reviews",
      href: `${basePath}/reviews`,
      // count: brand._count.reviews, // Uncomment when relation exists
    },
    {
      key: "stores",
      label: "Store Locations",
      href: `${basePath}/stores`,
      count: brand.locations?.length || 0,
    },
    {
      key: "about",
      label: "About & Awards",
      href: `${basePath}/about`,
    },
  ];

  // Header content with brand info
  const headerContent = (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <img
          src={brand.logo || "/placeholder.svg"}
          alt={brand.name}
          className="w-16 h-16 object-contain rounded bg-white border"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            {brand.featured && <Badge variant="default">Featured</Badge>}
            <Badge variant="outline">{brand.isOnline ? "Online" : "Physical"}</Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {brand.categories.slice(0, 3).map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-xs">
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      {brand.websiteUrl && (
        <Button asChild>
          <Link href={brand.websiteUrl} target="_blank">
            Visit Website
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
    </div>
  );

  return (
    <TabbedLayout
      tabs={tabs}
      basePath={basePath}
      title={brand.name}
      description={brand.description || undefined}
      headerContent={headerContent}
    >
      {children}
    </TabbedLayout>
  );
} 