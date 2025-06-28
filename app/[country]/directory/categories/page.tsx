import { notFound } from 'next/navigation'
import { CategoryGrid } from '@/components/category-grid'
import { client } from '@/sanity/lib/client'

// Define supported countries
const SUPPORTED_COUNTRIES = {
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    flag: '🇬🇧',
    domain: '.co.uk',
    language: 'en-GB'
  },
  us: {
    name: 'United States',
    currency: 'USD', 
    flag: '🇺🇸',
    domain: '.com',
    language: 'en-US'
  },
  ca: {
    name: 'Canada',
    currency: 'CAD',
    flag: '🇨🇦', 
    domain: '.ca',
    language: 'en-CA'
  },
  au: {
    name: 'Australia',
    currency: 'AUD',
    flag: '🇦🇺',
    domain: '.com.au', 
    language: 'en-AU'
  }
}

type CountryCode = keyof typeof SUPPORTED_COUNTRIES

interface PageProps {
  params: {
    country: string
  }
}

// Generate static params for supported countries
export async function generateStaticParams() {
  return Object.keys(SUPPORTED_COUNTRIES).map((country) => ({
    country,
  }))
}

// Generate metadata for each country
export async function generateMetadata({ params }: PageProps) {
  const country = SUPPORTED_COUNTRIES[params.country as CountryCode]
  
  if (!country) {
    return {}
  }

  return {
    title: `Sleep Directory ${country.flag} - Best Sleep Products in ${country.name}`,
    description: `Discover the best sleep products available in ${country.name}. From mattresses to pillows, find everything you need for better sleep.`,
    alternates: {
      canonical: `https://sleepdirectory.com/${params.country}/directory/categories`,
      languages: {
        [country.language]: `https://sleepdirectory.com/${params.country}/directory/categories`,
      }
    },
    openGraph: {
      title: `Sleep Directory ${country.flag} - ${country.name}`,
      description: `The ultimate sleep product directory for ${country.name}`,
      url: `https://sleepdirectory.com/${params.country}/directory/categories`,
      siteName: 'Sleep Directory',
      locale: country.language,
    }
  }
}

export default async function CountryCategoriesPage({ params }: PageProps) {
  const countryData = SUPPORTED_COUNTRIES[params.country as CountryCode]
  
  if (!countryData) {
    notFound()
  }

  // Fetch categories from Sanity
  const categories = await client.fetch(`
    *[_type == "category"] | order(order asc, title asc) {
      _id,
      title,
      slug,
      description,
      "subNicheCount": count(*[_type == "subNiche" && references(^._id)])
    }
  `)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{countryData.flag}</span>
          <div>
            <h1 className="text-3xl font-bold">
              Sleep Directory - {countryData.name}
            </h1>
            <p className="text-muted-foreground">
              Discover the best sleep products available in {countryData.name}
            </p>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            🛍️ Shopping in {countryData.name} • 💰 Prices in {countryData.currency} • 
            🚚 Local shipping & availability
          </p>
        </div>
      </div>

      <CategoryGrid 
        categories={categories} 
        country={params.country}
        countryData={countryData}
      />
    </div>
  )
} 