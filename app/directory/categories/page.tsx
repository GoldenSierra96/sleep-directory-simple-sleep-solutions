import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bed, 
  Moon, 
  Shield, 
  Sparkles, 
  Wind, 
  Brain, 
  Heart, 
  Zap,
  Home,
  Pill,
  Volume2,
  Shirt,
  Plane,
  Activity
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sleep Categories - Simple Sleep Solutions | Complete Guide to Better Sleep",
  description: "Discover our comprehensive collection of sleep solutions. From mattresses to sleep aids, find everything you need for perfect sleep. Expert-curated categories for better rest.",
  keywords: "sleep solutions, mattresses, pillows, sleep aids, bedding, sleep masks, sleep tracking, sleep supplements",
  openGraph: {
    title: "Complete Sleep Solutions Guide - Every Category Explained",
    description: "Transform your sleep with our expert-curated collection of sleep products and solutions. Find the perfect category for your sleep needs.",
    type: "website",
  },
}

const sleepCategories = [
  {
    id: "mattresses",
    name: "Mattresses",
    description: "Memory foam, hybrid, innerspring, and latex mattresses for perfect spinal alignment and comfort.",
    icon: Bed,
    benefits: ["Proper spinal alignment", "Pressure point relief", "Temperature regulation", "Motion isolation"],
    productCount: "200+",
    slug: "mattresses",
    gradient: "from-blue-50 to-indigo-100",
    iconColor: "text-blue-600"
  },
  {
    id: "pillows", 
    name: "Pillows",
    description: "Memory foam, down, latex, and specialty pillows for optimal neck and head support.",
    icon: Moon,
    benefits: ["Neck alignment", "Reduced snoring", "Temperature control", "Hypoallergenic options"],
    productCount: "150+", 
    slug: "pillows",
    gradient: "from-purple-50 to-violet-100",
    iconColor: "text-purple-600"
  },
  {
    id: "bedding",
    name: "Bedding & Sheets", 
    description: "Premium sheets, comforters, duvets, and blankets for ultimate comfort and temperature control.",
    icon: Home,
    benefits: ["Moisture wicking", "Temperature regulation", "Softness & comfort", "Durability"],
    productCount: "300+",
    slug: "bedding", 
    gradient: "from-green-50 to-emerald-100",
    iconColor: "text-green-600"
  },
  {
    id: "sleep-masks",
    name: "Sleep Masks",
    description: "Blackout masks and light-blocking solutions for deeper, uninterrupted sleep.",
    icon: Shield,
    benefits: ["Complete darkness", "Improved REM sleep", "Travel friendly", "Comfortable fit"],
    productCount: "80+",
    slug: "sleep-masks",
    gradient: "from-gray-50 to-slate-100", 
    iconColor: "text-gray-600"
  },
  {
    id: "sleep-aids",
    name: "Sleep Aids",
    description: "Sound machines, white noise generators, and audio solutions for peaceful sleep.",
    icon: Volume2,
    benefits: ["Mask disruptive noise", "Relaxation sounds", "Consistent audio", "Timer functions"],
    productCount: "60+",
    slug: "sleep-aids",
    gradient: "from-teal-50 to-cyan-100",
    iconColor: "text-teal-600"
  },
  {
    id: "supplements",
    name: "Sleep Supplements",
    description: "Natural melatonin, magnesium, and herbal supplements for better sleep quality.",
    icon: Pill,
    benefits: ["Natural ingredients", "Faster sleep onset", "Improved sleep quality", "Non-habit forming"],
    productCount: "40+",
    slug: "supplements", 
    gradient: "from-orange-50 to-amber-100",
    iconColor: "text-orange-600"
  },
  {
    id: "sleep-tracking",
    name: "Sleep Tracking",
    description: "Wearables and devices to monitor and optimize your sleep patterns and quality.",
    icon: Activity,
    benefits: ["Sleep insights", "Pattern analysis", "Smart alarms", "Health integration"],
    productCount: "30+",
    slug: "sleep-tracking",
    gradient: "from-rose-50 to-pink-100", 
    iconColor: "text-rose-600"
  },
  {
    id: "sleepwear",
    name: "Sleepwear",
    description: "Comfortable pajamas and loungewear designed for optimal sleep temperature and comfort.",
    icon: Shirt,
    benefits: ["Temperature regulation", "Comfort & mobility", "Moisture wicking", "Skin-friendly fabrics"],
    productCount: "120+",
    slug: "sleepwear",
    gradient: "from-indigo-50 to-blue-100",
    iconColor: "text-indigo-600"
  },
  {
    id: "travel-sleep",
    name: "Travel Sleep",
    description: "Portable sleep solutions including travel pillows and compact sleep aids for better rest on-the-go.", 
    icon: Plane,
    benefits: ["Portable design", "Compact storage", "Versatile use", "Travel comfort"],
    productCount: "50+",
    slug: "travel-sleep",
    gradient: "from-violet-50 to-purple-100",
    iconColor: "text-violet-600"
  }
]

const sleepBenefits = [
  {
    icon: Brain,
    title: "Enhanced Cognitive Function",
    description: "Better sleep improves memory, focus, and decision-making abilities."
  },
  {
    icon: Heart, 
    title: "Improved Physical Health",
    description: "Quality sleep supports immune function, heart health, and cellular repair."
  },
  {
    icon: Sparkles,
    title: "Elevated Mood & Energy",
    description: "Proper rest leads to better emotional regulation and sustained energy levels."
  },
  {
    icon: Zap,
    title: "Peak Performance",
    description: "Optimal sleep enhances athletic performance and productivity."
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simple Sleep Solutions
              <span className="block text-blue-200 text-2xl md:text-3xl font-normal mt-2">
                For Every Sleep Need
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Transform your sleep with our expertly curated collection of sleep products. 
              From premium mattresses to smart sleep tracking, discover everything you need for perfect rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
                Explore Categories
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                Sleep Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sleep Matters Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Quality Sleep Matters
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sleep isn't just rest—it's when your body and mind repair, restore, and prepare for peak performance. 
              The right sleep solutions can transform your health, productivity, and quality of life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sleepBenefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Sleep Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every sleep challenge has a solution. Explore our comprehensive categories to find 
              exactly what you need for your perfect night's rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sleepCategories.map((category) => (
              <Card key={category.id} className={`group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${category.gradient} hover:scale-105`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-white shadow-sm ${category.iconColor}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="bg-white/80 text-gray-700">
                      {category.productCount}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-white/60 border-gray-300">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full bg-white text-gray-900 hover:bg-gray-50 shadow-sm">
                    <Link href={`/directory/categories/${category.slug}`}>
                      Explore {category.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Sleep?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands who've discovered the power of simple, effective sleep solutions. 
            Start your journey to better sleep today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8">
              Take Sleep Quiz
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-300 hover:bg-white/10 font-semibold px-8">
              Browse All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 