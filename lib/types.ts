import type { Prisma } from "@prisma/client"

// Product with relations
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    brand: true
    categories: true
    reviews: {
      include: {
        author: true
      }
    }
  }
}>

// Blog post with relations
export type BlogPostWithRelations = Prisma.BlogPostGetPayload<{
  include: {
    author: true
    categories: true
    tags: true
  }
}>

// Thread with relations
export type ThreadWithRelations = Prisma.ThreadGetPayload<{
  include: {
    author: true
    forumCategory: true
    posts: {
      include: {
        author: true
        likes: true
      }
    }
  }
}>

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  success: boolean
}

// Filter types
export interface ProductFilters {
  categories?: string[]
  brands?: string[]
  priceMin?: number
  priceMax?: number
  rating?: number
  tags?: string[]
  search?: string
}

export interface BlogFilters {
  categories?: string[]
  tags?: string[]
  author?: string
  search?: string
}
