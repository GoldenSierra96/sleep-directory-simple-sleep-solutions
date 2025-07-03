export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { mockForumThreads } from "@/lib/mock-data"

export async function GET(request?: NextRequest) {
  try {
    // Default values for static generation
    let page = 1
    let limit = 10
    let category = null

    // Only parse URL if request is available (not during static generation)
    if (request && request.url) {
      const url = new URL(request.url)
      page = parseInt(url.searchParams.get("page") || "1")
      limit = parseInt(url.searchParams.get("limit") || "10")
      category = url.searchParams.get("category")
    }

    // Filter mock threads
    let filteredThreads = mockForumThreads

    if (category) {
      filteredThreads = filteredThreads.filter(thread => 
        thread.category.slug === category
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedThreads = filteredThreads.slice(startIndex, endIndex)

    return NextResponse.json({
      threads: paginatedThreads,
      pagination: {
        page,
        limit,
        total: filteredThreads.length,
        totalPages: Math.ceil(filteredThreads.length / limit),
      },
    })
  } catch (error) {
    console.error('Forum threads API error:', error)
    return NextResponse.json({ threads: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } })
  }
}
