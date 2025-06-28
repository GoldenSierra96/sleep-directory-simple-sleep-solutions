import { MetadataRoute } from 'next'
import { client } from '../sanity/lib/client'

interface SitemapEntry {
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

// Define supported countries
const SUPPORTED_COUNTRIES = ['uk', 'us', 'ca', 'au'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sleepdirectory.com' // Replace with your actual domain

  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Country-specific pages
  const countryPages: SitemapEntry[] = []
  
  for (const country of SUPPORTED_COUNTRIES) {
    // Main country directory pages
    countryPages.push(
      {
        url: `${baseUrl}/${country}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${country}/directory`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${country}/directory/categories`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    )
  }

  // Fetch categories from Sanity
  const categories = await client.fetch(`
    *[_type == "category"] {
      slug,
      _updatedAt
    }
  `)

  // Generate category pages for each country
  const categoryPages: SitemapEntry[] = []
  for (const country of SUPPORTED_COUNTRIES) {
    categories.forEach((category: any) => {
      categoryPages.push({
        url: `${baseUrl}/${country}/directory/categories/${category.slug.current}`,
        lastModified: new Date(category._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })
    })
  }

  // Fetch subniches from Sanity
  const subNiches = await client.fetch(`
    *[_type == "subNiche"] {
      slug,
      _updatedAt,
      "parentCategory": parentCategories[0]->slug.current
    }
  `)

  // Generate subniche pages for each country
  const subNichePages: SitemapEntry[] = []
  for (const country of SUPPORTED_COUNTRIES) {
    subNiches.forEach((subNiche: any) => {
      if (subNiche.parentCategory) {
        subNichePages.push({
          url: `${baseUrl}/${country}/directory/categories/${subNiche.parentCategory}/${subNiche.slug.current}`,
          lastModified: new Date(subNiche._updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        })
      }
    })
  }

  // Fetch brands from Sanity (if any exist)
  const brands = await client.fetch(`
    *[_type == "brand"] {
      slug,
      _updatedAt
    }
  `)

  // Generate brand pages for each country
  const brandPages: SitemapEntry[] = []
  for (const country of SUPPORTED_COUNTRIES) {
    brands.forEach((brand: any) => {
      brandPages.push({
        url: `${baseUrl}/${country}/directory/brands/${brand.slug.current}`,
        lastModified: new Date(brand._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })
    })
  }

  // Fetch products from Sanity (if any exist)
  const products = await client.fetch(`
    *[_type == "product"] {
      slug,
      _updatedAt
    }
  `)

  // Generate product pages for each country
  const productPages: SitemapEntry[] = []
  for (const country of SUPPORTED_COUNTRIES) {
    products.forEach((product: any) => {
      productPages.push({
        url: `${baseUrl}/${country}/directory/products/${product.slug.current}`,
        lastModified: new Date(product._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      })
    })
  }

  // Fetch custom pages from Sanity (if any exist)
  const pages = await client.fetch(`
    *[_type == "page"] {
      slug,
      _updatedAt
    }
  `)

  // Generate custom pages for each country
  const customPages: SitemapEntry[] = []
  for (const country of SUPPORTED_COUNTRIES) {
    pages.forEach((page: any) => {
      customPages.push({
        url: `${baseUrl}/${country}/${page.slug.current}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.4,
      })
    })
  }

  return [
    ...staticPages,
    ...countryPages,
    ...categoryPages,
    ...subNichePages,
    ...brandPages,
    ...productPages,
    ...customPages,
  ]
} 