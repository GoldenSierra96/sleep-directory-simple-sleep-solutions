import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description: string
  subNicheCount: number
}

interface CountryData {
  name: string
  currency: string
  flag: string
  domain: string
  language: string
}

interface CategoryGridProps {
  categories: Category[]
  country: string
  countryData: CountryData
}

export function CategoryGrid({ categories, country, countryData }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/${country}/directory/categories/${category.slug.current}`}
          className="block transition-transform hover:scale-105"
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {category.title}
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {category.subNicheCount} items
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3">
                {category.description}
              </CardDescription>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <span className="mr-1">{countryData.flag}</span>
                Available in {countryData.name}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
} 