"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, MapPin, Globe, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")

  const listings = [
    {
      id: 1,
      name: "Purple Mattress",
      category: "Brand",
      type: "Mattress Manufacturer",
      rating: 4.8,
      reviews: 2847,
      location: "Utah, USA",
      website: "purple.com",
      phone: "+1-888-848-2305",
      image: "/placeholder.svg?height=200&width=300",
      description: "Revolutionary gel grid technology for temperature-neutral comfort and support.",
      tags: ["Memory Foam", "Cooling", "Online Direct"],
    },
    {
      id: 2,
      name: "Sleep Cycle",
      category: "App",
      type: "Sleep Tracking App",
      rating: 4.6,
      reviews: 45231,
      location: "Global",
      website: "sleepcycle.com",
      image: "/placeholder.svg?height=200&width=300",
      description: "Smart alarm clock that analyzes your sleep patterns and wakes you during light sleep.",
      tags: ["Sleep Tracking", "Smart Alarm", "iOS", "Android"],
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson Sleep Clinic",
      category: "Therapy",
      type: "Sleep Medicine Specialist",
      rating: 4.9,
      reviews: 156,
      location: "New York, NY",
      phone: "+1-212-555-0123",
      image: "/placeholder.svg?height=200&width=300",
      description: "Board-certified sleep medicine physician specializing in sleep apnea and insomnia treatment.",
      tags: ["Sleep Apnea", "Insomnia", "CBT-I", "CPAP"],
    },
    {
      id: 4,
      name: "Tempur-Pedic",
      category: "Brand",
      type: "Mattress Manufacturer",
      rating: 4.7,
      reviews: 3421,
      location: "Kentucky, USA",
      website: "tempurpedic.com",
      phone: "+1-800-821-6621",
      image: "/placeholder.svg?height=200&width=300",
      description: "NASA-developed memory foam technology for personalized comfort and support.",
      tags: ["Memory Foam", "Pressure Relief", "Premium"],
    },
    {
      id: 5,
      name: "Headspace Sleep Stories",
      category: "App",
      type: "Meditation & Sleep App",
      rating: 4.5,
      reviews: 12847,
      location: "Global",
      website: "headspace.com",
      image: "/placeholder.svg?height=200&width=300",
      description: "Guided sleep meditations and bedtime stories to help you fall asleep naturally.",
      tags: ["Meditation", "Sleep Stories", "Relaxation", "Mindfulness"],
    },
    {
      id: 6,
      name: "Sleep Number",
      category: "Brand",
      type: "Smart Mattress Company",
      rating: 4.4,
      reviews: 2156,
      location: "Minnesota, USA",
      website: "sleepnumber.com",
      phone: "+1-800-753-3755",
      image: "/placeholder.svg?height=200&width=300",
      description: "Adjustable firmness smart beds with sleep tracking technology.",
      tags: ["Smart Bed", "Adjustable", "Sleep Tracking", "Couples"],
    },
  ]

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" || listing.category.toLowerCase() === selectedCategory.toLowerCase()

    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "4+" && listing.rating >= 4) ||
      (selectedRating === "4.5+" && listing.rating >= 4.5)

    return matchesSearch && matchesCategory && matchesRating
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-full" />
              <span className="text-2xl font-bold">SleepDirectory</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/directory" className="text-foreground font-medium">
                Directory
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Button>Submit Listing</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Sleep Solutions Directory</h1>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search brands, products, apps, or services..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="brand">Brands</SelectItem>
                  <SelectItem value="app">Apps</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Showing {filteredListings.length} of {listings.length} results
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <div className="flex">
                <div className="w-48 h-48 relative flex-shrink-0">
                  <Image
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.name}
                    fill
                    className="object-cover rounded-l-lg"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {listing.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-1">{listing.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{listing.rating}</span>
                      <span className="text-sm text-muted-foreground">({listing.reviews})</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {listing.location}
                    </div>
                    {listing.website && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="h-4 w-4 mr-2" />
                        {listing.website}
                      </div>
                    )}
                    {listing.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        {listing.phone}
                      </div>
                    )}
                  </div>

                  <Link href={`/listing/${listing.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No results found for your search criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedRating("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
