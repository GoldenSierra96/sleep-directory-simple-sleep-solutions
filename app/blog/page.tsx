"use client"

import { useState, useEffect } from "react"

export const dynamic = "force-dynamic"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Eye, ArrowRight } from "lucide-react"
import { mockBlogPosts, mockBlogCategories, type BlogPost } from "@/lib/mock-data"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    let filtered = mockBlogPosts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.categories.some((cat) => cat.slug === selectedCategory))
    }

    setPosts(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Sleep Blog</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert insights, tips, and research to help you achieve better sleep
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Articles
                  </Button>
                  {mockBlogCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.slug ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="w-64 h-48 bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                        <img
                          src={post.featuredImage || "/placeholder.svg?height=200&width=300"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author.name}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.publishedAt!).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.viewCount} views
                          </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            {post.categories.map((category) => (
                              <Badge key={category.id} variant="secondary">
                                {category.name}
                              </Badge>
                            ))}
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag.id} variant="outline">
                                {tag.name}
                              </Badge>
                            ))}
                          </div>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
