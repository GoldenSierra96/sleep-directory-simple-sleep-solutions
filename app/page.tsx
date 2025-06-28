"use client"

export const dynamic = "force-dynamic"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, ArrowRight, Search, Bed, Moon, Users, BookOpen } from "lucide-react"
import { mockProducts, mockBlogPosts, mockBrands, mockCategories, type Product, type BlogPost } from "@/lib/mock-data"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Get featured products
    setFeaturedProducts(mockProducts.filter((p) => p.isFeatured).slice(0, 3))

    // Get recent blog posts
    setRecentPosts(mockBlogPosts.slice(0, 3))
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // In a real app, this would navigate to search results
      console.log("Searching for:", searchTerm)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Complete Sleep Directory
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the best sleep products, expert advice, and connect with a community dedicated to better sleep
              health.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for mattresses, pillows, sleep tips..."
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" className="absolute right-2 top-2 rounded-full">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{mockProducts.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{mockBrands.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{mockBlogPosts.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Community</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore Sleep Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find exactly what you need for better sleep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Bed className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Top-rated sleep products recommended by our community</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Latest Sleep Insights</h2>
              <p className="text-gray-600 dark:text-gray-400">Expert advice and tips for better sleep</p>
            </div>
            <Link href="/blog">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img
                    src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <img
                      src={post.author.avatarUrl || "/placeholder.svg?height=32&width=32"}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium">{post.author.name}</div>
                      <div className="text-xs text-gray-500">{new Date(post.publishedAt!).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.id} variant="outline" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Sleep Community</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with thousands of sleep enthusiasts, share experiences, and get expert advice on your sleep journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/forum">
              <Button size="lg" variant="secondary">
                <Users className="mr-2 h-5 w-5" />
                Join Forum
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Read Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Moon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sweet Dreams Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Get weekly sleep tips, product recommendations, and exclusive deals delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
