import { prisma } from "@/lib/db"

export type BlogPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED"

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  body: string
  featuredImage?: string
  categoryIds: string[]
  tagIds: string[]
  status: BlogPostStatus
  publishedAt?: Date
}

export async function generateSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  let slug = baseSlug
  let counter = 1

  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

export function extractExcerpt(body: string, maxLength = 160): string {
  // Remove HTML tags and get plain text
  const plainText = body.replace(/<[^>]*>/g, "").trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength)
  const lastSentence = truncated.lastIndexOf(".")

  if (lastSentence > maxLength * 0.7) {
    return truncated.substring(0, lastSentence + 1)
  }

  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ")
  return truncated.substring(0, lastSpace) + "..."
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
