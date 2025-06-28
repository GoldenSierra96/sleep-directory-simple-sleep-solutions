// FREE Alternative to Algolia - PostgreSQL Full-Text Search
import { prisma } from "./db"

export interface SearchResult {
  id: string
  title: string
  description: string
  type: "product" | "blog" | "thread"
  slug: string
  image?: string
  category?: string
}

export async function searchAll(query: string, limit = 10): Promise<SearchResult[]> {
  const searchQuery = query
    .split(" ")
    .map((term) => `${term}:*`)
    .join(" & ")

  // Search products
  const products = await prisma.$queryRaw<any[]>`
    SELECT 
      id, name as title, description, 'product' as type, slug,
      ts_rank(to_tsvector('english', name || ' ' || description), to_tsquery('english', ${searchQuery})) as rank
    FROM "Product"
    WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery('english', ${searchQuery})
    ORDER BY rank DESC
    LIMIT ${Math.floor(limit / 3)}
  `

  // Search blog posts
  const blogPosts = await prisma.$queryRaw<any[]>`
    SELECT 
      id, title, excerpt as description, 'blog' as type, slug,
      ts_rank(to_tsvector('english', title || ' ' || excerpt), to_tsquery('english', ${searchQuery})) as rank
    FROM "BlogPost"
    WHERE to_tsvector('english', title || ' ' || excerpt) @@ to_tsquery('english', ${searchQuery})
    AND status = 'PUBLISHED'
    ORDER BY rank DESC
    LIMIT ${Math.floor(limit / 3)}
  `

  // Search forum threads
  const threads = await prisma.$queryRaw<any[]>`
    SELECT 
      id, title, title as description, 'thread' as type, slug,
      ts_rank(to_tsvector('english', title), to_tsquery('english', ${searchQuery})) as rank
    FROM "Thread"
    WHERE to_tsvector('english', title) @@ to_tsquery('english', ${searchQuery})
    ORDER BY rank DESC
    LIMIT ${Math.floor(limit / 3)}
  `

  return [...products, ...blogPosts, ...threads].map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type,
    slug: item.slug,
  }))
}
