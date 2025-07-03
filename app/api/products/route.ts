export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { mockProducts, filterProducts, sortProducts, paginateArray } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "12")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" || "desc"

  const filters = {
    categories: searchParams.get("categories")?.split(",").filter(Boolean),
    brands: searchParams.get("brands")?.split(",").filter(Boolean),
    priceMin: searchParams.get("priceMin") ? parseInt(searchParams.get("priceMin")!) : undefined,
    priceMax: searchParams.get("priceMax") ? parseInt(searchParams.get("priceMax")!) : undefined,
    rating: searchParams.get("rating") ? parseFloat(searchParams.get("rating")!) : undefined,
    tags: searchParams.get("tags")?.split(",").filter(Boolean),
    search: searchParams.get("search") || undefined,
  }

  // Filter and sort products
  let filteredProducts = filterProducts(mockProducts, filters)
  filteredProducts = sortProducts(filteredProducts, sortBy, sortOrder)

  // Paginate results
  const paginatedResult = paginateArray(filteredProducts, page, limit)

  return NextResponse.json({
    products: paginatedResult.data,
    pagination: paginatedResult.pagination,
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Product creation requires database setup" },
    { status: 501 }
  )
}
