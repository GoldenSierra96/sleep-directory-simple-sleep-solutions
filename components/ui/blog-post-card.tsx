import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPostWithRelations } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface BlogPostCardProps {
  post: BlogPostWithRelations
  variant?: "grid" | "list" | "featured"
  showExcerpt?: boolean
}

export function BlogPostCard({ post, variant = "grid", showExcerpt = true }: BlogPostCardProps) {
  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <div className="aspect-video relative">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
          <div className="lg:w-1/2 p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`}>
              <CardTitle className="text-2xl mb-4 hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
            </Link>
            {showExcerpt && post.excerpt && (
              <CardDescription className="mb-6 line-clamp-3">{post.excerpt}</CardDescription>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatarUrl || undefined} />
                  <AvatarFallback className="text-xs">{post.author.name?.[0]?.toUpperCase() || "A"}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(post.publishedAt!))} ago</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="w-48 h-32 relative flex-shrink-0">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.categories.slice(0, 2).map((category) => (
                <Badge key={category.id} variant="outline" className="text-xs">
                  {category.name}
                </Badge>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`}>
              <CardTitle className="mb-2 hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
            </Link>
            {showExcerpt && post.excerpt && (
              <CardDescription className="mb-3 line-clamp-2">{post.excerpt}</CardDescription>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={post.author.avatarUrl || undefined} />
                  <AvatarFallback className="text-xs">{post.author.name?.[0]?.toUpperCase() || "A"}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(post.publishedAt!))} ago</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.categories.slice(0, 2).map((category) => (
              <Badge key={category.id} variant="outline" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
          <CardTitle className="line-clamp-2 hover:text-primary transition-colors">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {showExcerpt && post.excerpt && (
            <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
          )}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={post.author.avatarUrl || undefined} />
                <AvatarFallback className="text-xs">{post.author.name?.[0]?.toUpperCase() || "A"}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
