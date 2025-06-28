import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const categorySlug = searchParams.get("category")

    const where: any = {}

    if (categorySlug) {
      where.forumCategory = {
        slug: categorySlug,
      }
    }

    const total = await prisma.thread.count({ where })

    const threads = await prisma.thread.findMany({
      where,
      include: {
        author: true,
        forumCategory: true,
        posts: {
          include: {
            author: true,
          },
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: [{ isPinned: "desc" }, { lastActivityAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      data: threads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    })
  } catch (error) {
    console.error("Error fetching threads:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch threads" }, { status: 500 })
  }
}
