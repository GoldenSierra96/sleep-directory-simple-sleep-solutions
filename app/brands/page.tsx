"use client"

export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    include: { categories: true },
    orderBy: { featured: "desc" },
  });
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  // For now, filtering/search is handled client-side (can be moved to server if needed)
  // This is a static scaffold; you can enhance with client interactivity later

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Brands</h1>
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input placeholder="Search brands..." className="max-w-xs" />
        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2">
          <Link href="/brands">
            <Badge variant="outline">All</Badge>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/brands?category=${cat.slug}`}>
              <Badge variant="secondary">{cat.name}</Badge>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                className="w-16 h-16 object-contain rounded bg-white border"
              />
              <div>
                <CardTitle className="text-xl font-bold mb-1">
                  <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
                  {brand.featured && <Badge className="ml-2">Featured</Badge>}
                </CardTitle>
                <div className="flex flex-wrap gap-1 mb-1">
                  {brand.categories.map((cat) => (
                    <Badge key={cat.id} variant="outline" className="text-xs">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  {brand.isOnline ? "Online" : "Physical"}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-3 mb-2">{brand.description}</p>
              <Link href={`/brands/${brand.slug}`} className="text-blue-600 hover:underline text-sm">
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 