export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { mockBlogPosts } from "@/lib/mock-data"

export async function GET(request?: NextRequest) {
  try {
    // Default values for static generation
    let page = 1
    let limit = 10
    let search = ""
    let category = null
    let tag = null

    // Only parse URL if request is available (not during static generation)
    if (request && request.url) {
      const url = new URL(request.url)
      page = parseInt(url.searchParams.get("page") || "1")
      limit = parseInt(url.searchParams.get("limit") || "10")
      search = url.searchParams.get("search") || ""
      category = url.searchParams.get("category")
      tag = url.searchParams.get("tag")
    }

    // Filter mock posts
    let filteredPosts = mockBlogPosts.filter(post => post.status === "PUBLISHED")

    if (search) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => cat.slug === category)
      )
    }

    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags.some(t => t.slug === tag)
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total: filteredPosts.length,
        totalPages: Math.ceil(filteredPosts.length / limit),
      },
    })
  } catch (error) {
    console.error('Blog posts API error:', error)
    return NextResponse.json({ posts: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } })
  }
}
