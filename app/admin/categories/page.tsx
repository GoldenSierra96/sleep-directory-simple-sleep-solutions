import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new">Add Category</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardHeader>
              <CardTitle className="text-lg font-bold mb-1">{cat.name}</CardTitle>
              <div className="text-xs text-muted-foreground">{cat.slug}</div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/categories/${cat.id}/edit`}>Edit</Link>
                </Button>
                <Button asChild size="sm" variant="destructive">
                  <Link href={`/admin/categories/${cat.id}/delete`}>Delete</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 