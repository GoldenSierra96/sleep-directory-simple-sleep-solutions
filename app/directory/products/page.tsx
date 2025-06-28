import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bed, FileText, Home, Pill, Fan, Layers, Volume2, Eye, Activity, Shirt, Briefcase } from "lucide-react"
import Link from "next/link"
import { SeoSchema } from "@/components/seo-schema"

export default function ProductsPage() {
  const productCategories = [
    {
      name: "Mattresses",
      slug: "mattresses",
      icon: Bed,
      description: "Memory foam, hybrid, innerspring, and latex mattresses for all sleep positions and preferences.",
      count: 120,
    },
    {
      name: "Pillows",
      slug: "pillows",
      icon: FileText,
      description: "Memory foam, down, down alternative, and specialty pillows for all sleep positions.",
      count: 85,
    },
    {
      name: "Beds",
      slug: "beds",
      icon: Home,
      description: "Bed frames, adjustable bases, platform beds, and more for your bedroom.",
      count: 65,
    },
    {
      name: "Bedding sets, Duvets, Blankets",
      slug: "bedding",
      icon: FileText,
      description: "Sheets, comforters, duvets, blankets, and bedding sets for all seasons.",
      count: 110,
    },
    {
      name: "Bedroom Decor",
      slug: "bedroom-decor",
      icon: Home,
      description: "Furniture, lighting, and accessories to create a sleep-friendly bedroom environment.",
      count: 75,
    },
    {
      name: "Sleep support supplements",
      slug: "supplements",
      icon: Pill,
      description: "Melatonin, magnesium, herbal supplements, and other natural sleep aids.",
      count: 45,
    },
    {
      name: "Air purifiers, humidifiers, Aromatherapy",
      slug: "air-quality",
      icon: Fan,
      description: "Devices and products to improve air quality and create a relaxing sleep environment.",
      count: 60,
    },
    {
      name: "Mattress toppers",
      slug: "mattress-toppers",
      icon: Layers,
      description: "Memory foam, latex, down, and cooling mattress toppers to enhance comfort.",
      count: 40,
    },
    {
      name: "Sleep aids and white noise emitters",
      slug: "sleep-aids",
      icon: Volume2,
      description: "Sound machines, white noise generators, and other audio sleep aids.",
      count: 35,
    },
    {
      name: "Sleep masks and Eye covers",
      slug: "sleep-masks",
      icon: Eye,
      description: "Blackout sleep masks, weighted eye covers, and light-blocking solutions.",
      count: 30,
    },
    {
      name: "Sleep Tracking devices and software",
      slug: "sleep-tracking",
      icon: Activity,
      description: "Wearables, bedside monitors, and apps to track and analyze your sleep patterns.",
      count: 50,
    },
    {
      name: "Sleepwear",
      slug: "sleepwear",
      icon: Shirt,
      description: "Comfortable pajamas, nightgowns, and loungewear designed for better sleep.",
      count: 55,
    },
    {
      name: "Sleep when travelling",
      slug: "travel-sleep",
      icon: Briefcase,
      description: "Travel pillows, portable sound machines, and other products for sleeping on the go.",
      count: 40,
    },
  ]

  return (
    <>
      {/* SEO Schema for Product Categories */}
      <SeoSchema
        title="Sleep Product Categories - Sleep Directory"
        description="Browse our comprehensive collection of sleep product categories including mattresses, pillows, bedding, and more to find the perfect sleep solutions."
        type="ItemList"
        items={productCategories.map((category, index) => ({
          name: category.name,
          url: `/directory/products/${category.slug}`,
          description: category.description,
          position: index + 1,
        }))}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sleep Product Categories</h1>
          <p className="text-muted-foreground">
            Browse our comprehensive collection of sleep products to find the perfect solutions for your sleep needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <Link key={index} href={`/directory/products/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.count} products</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
