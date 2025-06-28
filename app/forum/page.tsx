"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MessageCircle, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ThreadList } from "@/components/ui/thread-list"
import { SeoSchema } from "@/components/seo-schema"

export default function ForumPage() {
  const [threads, setThreads] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data
  const forumCategories = [
    {
      id: "1",
      name: "Sleep Disorders",
      slug: "sleep-disorders",
      description: "Discuss sleep apnea, insomnia, and other sleep disorders",
      threadCount: 245,
      postCount: 1823,
    },
    {
      id: "2",
      name: "Product Reviews",
      slug: "product-reviews",
      description: "Share your experiences with sleep products",
      threadCount: 189,
      postCount: 1456,
    },
    {
      id: "3",
      name: "Sleep Tips",
      slug: "sleep-tips",
      description: "Share and discover tips for better sleep",
      threadCount: 156,
      postCount: 987,
    },
    {
      id: "4",
      name: "General Discussion",
      slug: "general",
      description: "General sleep-related discussions",
      threadCount: 98,
      postCount: 654,
    },
  ]

  const recentThreads = [
    {
      id: "1",
      title: "Best mattress for side sleepers with back pain?",
      slug: "best-mattress-side-sleepers-back-pain",
      author: {
        id: "1",
        username: "sleepyuser",
        avatarUrl: "/placeholder.svg",
      },
      forumCategory: {
        id: "2",
        name: "Product Reviews",
        slug: "product-reviews",
      },
      posts: [
        {
          id: "1",
          author: {
            id: "2",
            username: "sleepexpert",
            avatarUrl: "/placeholder.svg",
          },
          createdAt: "2024-01-15T10:30:00Z",
        },
      ],
      _count: {
        posts: 12,
      },
      viewCount: 156,
      isPinned: false,
      isLocked: false,
      createdAt: "2024-01-14T08:00:00Z",
      lastActivityAt: "2024-01-15T10:30:00Z",
    },
  ]

  return (
    <>
      <SeoSchema
        title="Sleep Community Forum - Share Experiences and Get Advice"
        description="Join our sleep community forum to discuss sleep disorders, product reviews, tips, and connect with others on their sleep journey."
        type="WebPage"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Sleep Community Forum</h1>
                <p className="text-muted-foreground">
                  Connect with others, share experiences, and get advice on your sleep journey
                </p>
              </div>
              <Button asChild>
                <Link href="/forum/new-thread">
                  <Plus className="h-4 w-4 mr-2" />
                  New Thread
                </Link>
              </Button>
            </div>

            {/* Search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {forumCategories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Forum Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">688</div>
                    <div className="text-sm text-muted-foreground">Total Threads</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">1.2k</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">4.9k</div>
                    <div className="text-sm text-muted-foreground">Total Posts</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Threads */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Recent Discussions</h2>
                <ThreadList threads={recentThreads} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Forum Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {forumCategories.map((category) => (
                    <Link key={category.id} href={`/forum/categories/${category.slug}`}>
                      <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <h3 className="font-semibold mb-1">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{category.threadCount} threads</span>
                          <span>{category.postCount} posts</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Forum Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Be respectful and kind to all members</li>
                    <li>• Stay on topic and use appropriate categories</li>
                    <li>• No spam or self-promotion</li>
                    <li>• Search before posting to avoid duplicates</li>
                    <li>• Follow medical disclaimer guidelines</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/forum/guidelines">View Full Guidelines</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Active Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "SleepExpert", posts: 245, badge: "Expert" },
                      { name: "RestfulNights", posts: 189, badge: "Helper" },
                      { name: "DreamChaser", posts: 156, badge: "Active" },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold">{member.name[0]}</span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{member.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              {member.badge}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{member.posts} posts</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
