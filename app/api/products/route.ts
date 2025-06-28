import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { ProductFilters, PaginatedResponse, ProductWithRelations } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    // Parse filters
    const filters: ProductFilters = {
      categories: searchParams.get("categories")?.split(",").filter(Boolean),
      brands: searchParams.get("brands")?.split(",").filter(Boolean),
      priceMin: searchParams.get("priceMin") ? Number.parseFloat(searchParams.get("priceMin")!) : undefined,
      priceMax: searchParams.get("priceMax") ? Number.parseFloat(searchParams.get("priceMax")!) : undefined,
      rating: searchParams.get("rating") ? Number.parseFloat(searchParams.get("rating")!) : undefined,
      tags: searchParams.get("tags")?.split(",").filter(Boolean),
      search: searchParams.get("search") || undefined,
    }

    // Build where clause
    const where: any = {
      isActive: true,
    }

    if (filters.categories?.length) {
      where.categories = {
        some: {
          slug: {
            in: filters.categories,
          },
        },
      }
    }

    if (filters.brands?.length) {
      where.brand = {
        slug: {
          in: filters.brands,
        },
      }
    }

    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      where.price = {}
      if (filters.priceMin !== undefined) where.price.gte = filters.priceMin
      if (filters.priceMax !== undefined) where.price.lte = filters.priceMax
    }

    if (filters.rating !== undefined) {
      where.rating = {
        gte: filters.rating,
      }
    }

    if (filters.tags?.length) {
      where.tags = {
        hasSome: filters.tags,
      }
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { tags: { hasSome: [filters.search] } },
      ]
    }

    // Build order by clause
    const orderBy: any = {}
    if (sortBy === "price") {
      orderBy.price = sortOrder
    } else if (sortBy === "rating") {
      orderBy.rating = sortOrder
    } else if (sortBy === "name") {
      orderBy.name = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Get total count
    const total = await prisma.product.count({ where })

    // Get products
    const products = await prisma.product.findMany({
      where,
      include: {
        brand: true,
        categories: true,
        reviews: {
          include: {
            author: true,
          },
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    })

    const response: PaginatedResponse<ProductWithRelations> = {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        ...body,
        slug: body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        categories: {
          connect: body.categoryIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: {
        brand: true,
        categories: true,
      },
    })

    return NextResponse.json({ data: product, success: true })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 })
  }
}
