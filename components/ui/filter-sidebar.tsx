"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"
import type { ProductFilters } from "@/lib/types"

interface FilterSidebarProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  categories: Array<{ id: string; name: string; slug: string }>
  brands: Array<{ id: string; name: string; slug: string }>
  priceRange: { min: number; max: number }
  className?: string
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  categories,
  brands,
  priceRange,
  className,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters)
  const [priceValues, setPriceValues] = useState([
    filters.priceMin || priceRange.min,
    filters.priceMax || priceRange.max,
  ])

  useEffect(() => {
    setLocalFilters(filters)
    setPriceValues([filters.priceMin || priceRange.min, filters.priceMax || priceRange.max])
  }, [filters, priceRange])

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const newCategories = checked
      ? [...(localFilters.categories || []), categorySlug]
      : (localFilters.categories || []).filter((c) => c !== categorySlug)

    const newFilters = { ...localFilters, categories: newCategories }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleBrandChange = (brandSlug: string, checked: boolean) => {
    const newBrands = checked
      ? [...(localFilters.brands || []), brandSlug]
      : (localFilters.brands || []).filter((b) => b !== brandSlug)

    const newFilters = { ...localFilters, brands: newBrands }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceValues(values)
    const newFilters = {
      ...localFilters,
      priceMin: values[0],
      priceMax: values[1],
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleRatingChange = (rating: number) => {
    const newFilters = {
      ...localFilters,
      rating: localFilters.rating === rating ? undefined : rating,
    }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: ProductFilters = {}
    setLocalFilters(clearedFilters)
    setPriceValues([priceRange.min, priceRange.max])
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== undefined,
  )

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={localFilters.categories?.includes(category.slug) || false}
                  onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brands */}
        <div>
          <h3 className="font-semibold mb-3">Brands</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={localFilters.brands?.includes(brand.slug) || false}
                  onCheckedChange={(checked) => handleBrandChange(brand.slug, checked as boolean)}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceValues}
              onValueChange={handlePriceChange}
              max={priceRange.max}
              min={priceRange.min}
              step={10}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceValues[0]}</span>
              <span>${priceValues[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <h3 className="font-semibold mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={localFilters.rating === rating}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                >
                  {rating}+ Stars
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {localFilters.categories?.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {categories.find((c) => c.slug === category)?.name}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
                  </Badge>
                ))}
                {localFilters.brands?.map((brand) => (
                  <Badge key={brand} variant="secondary" className="text-xs">
                    {brands.find((b) => b.slug === brand)?.name}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleBrandChange(brand, false)} />
                  </Badge>
                ))}
                {localFilters.rating && (
                  <Badge variant="secondary" className="text-xs">
                    {localFilters.rating}+ Stars
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleRatingChange(localFilters.rating!)}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
