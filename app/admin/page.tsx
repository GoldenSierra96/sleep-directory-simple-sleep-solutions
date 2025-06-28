"use client"

export const dynamic = "force-dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Users, FileText, MessageSquare, TrendingUp } from "lucide-react"
import { prisma } from "@/lib/db"
import Link from "next/link"

async function getDashboardStats() {
  const [productCount, userCount, blogPostCount, threadCount, recentProducts, recentPosts, recentThreads] =
    await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.user.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.thread.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { brand: true, categories: true },
      }),
      prisma.blogPost.findMany({
        take: 5,
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { author: true },
      }),
      prisma.thread.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { author: true, forumCategory: true },
      }),
    ])

  return {
    stats: { productCount, userCount, blogPostCount, threadCount },
    recent: { products: recentProducts, posts: recentPosts, threads: recentThreads },
  }
}

export default async function AdminDashboard() {
  const { stats, recent } = await getDashboardStats()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your sleep directory platform from here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productCount}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userCount}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPostCount}</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forum Threads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.threadCount}</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Recent Products</TabsTrigger>
          <TabsTrigger value="posts">Recent Posts</TabsTrigger>
          <TabsTrigger value="threads">Recent Threads</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Products</CardTitle>
              <CardDescription>Latest products added to the directory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent.products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.brand.name} • {product.categories[0]?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={product.isActive ? "default" : "secondary"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>Latest blog posts published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent.posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        By {post.author.name} • {new Date(post.publishedAt!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{post.status}</Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Forum Threads</CardTitle>
              <CardDescription>Latest discussions in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recent.threads.map((thread) => (
                  <div key={thread.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{thread.title}</p>
                      <p className="text-sm text-muted-foreground">
                        By {thread.author.username} in {thread.forumCategory.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{thread.forumCategory.name}</Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/forum/threads/${thread.slug}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild>
              <Link href="/admin/products/new">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/blog/new">
                <FileText className="h-4 w-4 mr-2" />
                Write Post
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/analytics">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
