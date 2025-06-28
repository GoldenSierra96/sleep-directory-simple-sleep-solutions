"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Grid, List, SlidersHorizontal, Star } from "lucide-react"
import Link from "next/link"
import {
  mockProducts,
  mockBrands,
  mockCategories,
  filterProducts,
  sortProducts,
  paginateArray,
  type Product,
} from "@/lib/mock-data"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 5000] as number[],
    rating: 0,
  })

  useEffect(() => {
    setProducts(mockProducts)
    applyFilters()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, searchTerm, sortBy, sortOrder])

  const applyFilters = () => {
    let filtered = filterProducts(mockProducts, {
      categories: filters.categories.length > 0 ? filters.categories : undefined,
      brands: filters.brands.length > 0 ? filters.brands : undefined,
      priceMin: filters.priceRange[0],
      priceMax: filters.priceRange[1],
      rating: filters.rating > 0 ? filters.rating : undefined,
      search: searchTerm || undefined,
    })

    filtered = sortProducts(filtered, sortBy, sortOrder)
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, categorySlug] : prev.categories.filter((c) => c !== categorySlug),
    }))
  }

  const handleBrandChange = (brandSlug: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked ? [...prev.brands, brandSlug] : prev.brands.filter((b) => b !== brandSlug),
    }))
  }

  const paginatedResults = paginateArray(filteredProducts, currentPage, 12)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Sleep Products</h1>
          <p className="text-muted-foreground mb-6">
            Discover the best sleep products to improve your sleep quality and comfort.
          </p>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {paginatedResults.data.length} of {filteredProducts.length} products
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {mockCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.slug}
                          checked={filters.categories.includes(category.slug)}
                          onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                        />
                        <label htmlFor={category.slug} className="text-sm">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-medium mb-3">Brands</h3>
                  <div className="space-y-2">
                    {mockBrands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand.slug}
                          checked={filters.brands.includes(brand.slug)}
                          onCheckedChange={(checked) => handleBrandChange(brand.slug, checked as boolean)}
                        />
                        <label htmlFor={brand.slug} className="text-sm">
                          {brand.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                      max={5000}
                      min={0}
                      step={100}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="font-medium mb-3">Minimum Rating</h3>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: Number.parseFloat(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedResults.data.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{product.brand.name}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${product.price.toLocaleString()}
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedResults.data.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-48 h-32 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="secondary">{product.brand.name}</Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ${product.price.toLocaleString()}
                          </div>
                          <Link href={`/products/${product.slug}`}>
                            <Button>View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {paginatedResults.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: paginatedResults.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    disabled={currentPage === paginatedResults.pagination.totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
