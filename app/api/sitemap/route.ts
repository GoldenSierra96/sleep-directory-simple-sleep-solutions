export const dynamic = "force-static"

import { NextResponse } from "next/server"
import { mockProducts, mockBlogPosts, mockCategories, mockBrands } from "@/lib/mock-data"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sleepdirectory.com"

  // Use mock data for quick deployment
  const products = mockProducts.map(p => ({ slug: p.slug, updatedAt: p.updatedAt }))
  const blogPosts = mockBlogPosts.map(p => ({ slug: p.slug, updatedAt: p.updatedAt }))
  const categories = mockCategories.map(c => ({ slug: c.slug, updatedAt: new Date().toISOString() }))
  const brands = mockBrands.map(b => ({ slug: b.slug, updatedAt: new Date().toISOString() }))

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/brands</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/directory</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/forum</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${brands
    .map(
      (brand) => `
  <url>
    <loc>${baseUrl}/brands/${brand.slug}</loc>
    <lastmod>${brand.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("")}
  ${products
    .map(
      (product) => `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${product.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("")}
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
    )
    .join("")}
  ${categories
    .map(
      (category) => `
  <url>
    <loc>${baseUrl}/directory/categories/${category.slug}</loc>
    <lastmod>${category.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
