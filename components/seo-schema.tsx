"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"

interface SeoSchemaProps {
  title: string
  description: string
  type?: "WebPage" | "ItemList" | "Product" | "Article" | "Organization" | "BreadcrumbList"
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  items?: Array<{
    name: string
    url: string
    image?: string
    description?: string
    position?: number
  }>
  breadcrumbs?: Array<{
    name: string
    item: string
    position: number
  }>
  productData?: {
    name: string
    image: string
    description: string
    brand?: string
    offers?: {
      price?: number
      priceCurrency?: string
      availability?: string
    }
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
  }
  articleData?: {
    headline: string
    image: string
    datePublished: string
    dateModified: string
    author: {
      name: string
      type: string
    }
  }
}

export function SeoSchema({
  title,
  description,
  type = "WebPage",
  image,
  datePublished,
  dateModified,
  author,
  items,
  breadcrumbs,
  productData,
  articleData,
}: SeoSchemaProps) {
  const pathname = usePathname()
  const baseUrl = "https://sleepdirectory.com" // Replace with your actual domain
  const url = `${baseUrl}${pathname}`

  // Base schema
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: description,
    url: url,
  }

  // WebPage schema
  const webPageSchema = {
    ...baseSchema,
    image: image ? image : `${baseUrl}/og-image.jpg`,
  }

  // ItemList schema
  const itemListSchema = {
    ...baseSchema,
    itemListElement: items?.map((item, index) => ({
      "@type": "ListItem",
      position: item.position || index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
      ...(item.image && { image: item.image }),
      ...(item.description && { description: item.description }),
    })),
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs?.map((crumb) => ({
      "@type": "ListItem",
      position: crumb.position,
      name: crumb.name,
      item: crumb.item.startsWith("http") ? crumb.item : `${baseUrl}${crumb.item}`,
    })),
  }

  // Product schema
  const productSchema = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        image: productData.image,
        description: productData.description,
        ...(productData.brand && { brand: { "@type": "Brand", name: productData.brand } }),
        ...(productData.offers && {
          offers: {
            "@type": "Offer",
            price: productData.offers.price,
            priceCurrency: productData.offers.priceCurrency || "USD",
            availability: productData.offers.availability || "https://schema.org/InStock",
          },
        }),
        ...(productData.aggregateRating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: productData.aggregateRating.ratingValue,
            reviewCount: productData.aggregateRating.reviewCount,
          },
        }),
      }
    : null

  // Article schema
  const articleSchema = articleData
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articleData.headline,
        image: articleData.image,
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified,
        author: {
          "@type": articleData.author.type,
          name: articleData.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Sleep Directory",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      }
    : null

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sleep Directory",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://www.facebook.com/sleepdirectory",
      "https://twitter.com/sleepdirectory",
      "https://www.instagram.com/sleepdirectory",
    ],
  }

  // Determine which schema to use
  let schemaData = webPageSchema

  if (type === "ItemList" && items) {
    schemaData = itemListSchema
  } else if (type === "Product" && productData) {
    schemaData = productSchema
  } else if (type === "Article" && articleData) {
    schemaData = articleSchema
  } else if (type === "Organization") {
    schemaData = organizationSchema
  } else if (type === "BreadcrumbList" && breadcrumbs) {
    schemaData = breadcrumbSchema
  }

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  )
}
