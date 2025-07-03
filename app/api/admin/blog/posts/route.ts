export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { mockBlogPosts } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")

  // Filter published posts only
  const publishedPosts = mockBlogPosts.filter(post => post.status === "PUBLISHED")

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = publishedPosts.slice(startIndex, endIndex)

  return NextResponse.json({
    posts: paginatedPosts,
    pagination: {
      page,
      limit,
      total: publishedPosts.length,
      totalPages: Math.ceil(publishedPosts.length / limit),
    },
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: "Blog post creation requires database setup" },
    { status: 501 }
  )
}
