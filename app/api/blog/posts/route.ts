import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import type { BlogFilters, PaginatedResponse, BlogPostWithRelations } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "publishedAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const filters: BlogFilters = {
      categories: searchParams.get("categories")?.split(",").filter(Boolean),
      tags: searchParams.get("tags")?.split(",").filter(Boolean),
      author: searchParams.get("author") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const where: any = {
      status: "PUBLISHED",
      publishedAt: {
        lte: new Date(),
      },
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

    if (filters.tags?.length) {
      where.tags = {
        some: {
          slug: {
            in: filters.tags,
          },
        },
      }
    }

    if (filters.author) {
      where.author = {
        username: filters.author,
      }
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { excerpt: { contains: filters.search, mode: "insensitive" } },
        { body: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    const total = await prisma.blogPost.count({ where })

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const response: PaginatedResponse<BlogPostWithRelations> = {
      data: posts,
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
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch blog posts" }, { status: 500 })
  }
}
