"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RichEditor } from "./rich-editor"
import { ImageUpload } from "./image-upload"
import { TagInput } from "./tag-input"
import { generateSlug, extractExcerpt, estimateReadingTime } from "@/lib/blog-utils"
import { CalendarIcon, Save, Eye, Send, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { BlogPost, BlogCategory, BlogTag } from "@prisma/client"

interface BlogPostFormProps {
  post?: BlogPost & {
    categories: BlogCategory[]
    tags: BlogTag[]
  }
  categories: BlogCategory[]
  tags: BlogTag[]
  onSave: (data: any) => Promise<void>
  onPublish: (data: any) => Promise<void>
  onPreview: (data: any) => void
}

export function BlogPostForm({ post, categories, tags, onSave, onPublish, onPreview }: BlogPostFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    featuredImage: post?.featuredImage || "",
    categoryIds: post?.categories.map((c) => c.id) || [],
    tagIds: post?.tags.map((t) => t.id) || [],
    status: post?.status || "DRAFT",
    publishedAt: post?.publishedAt ? new Date(post.publishedAt) : undefined,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(!post)
  const [autoGenerateExcerpt, setAutoGenerateExcerpt] = useState(!post?.excerpt)

  // Auto-generate slug from title
  useEffect(() => {
    if (autoGenerateSlug && formData.title) {
      const timeoutId = setTimeout(async () => {
        const slug = await generateSlug(formData.title)
        setFormData((prev) => ({ ...prev, slug }))
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [formData.title, autoGenerateSlug])

  // Auto-generate excerpt from body
  useEffect(() => {
    if (autoGenerateExcerpt && formData.body) {
      const excerpt = extractExcerpt(formData.body)
      setFormData((prev) => ({ ...prev, excerpt }))
    }
  }, [formData.body, autoGenerateExcerpt])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await onSave(formData)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePublish = async () => {
    setIsLoading(true)
    try {
      const publishData = {
        ...formData,
        status: "PUBLISHED",
        publishedAt: formData.publishedAt || new Date(),
      }
      await onPublish(publishData)
    } finally {
      setIsLoading(false)
    }
  }

  const readingTime = estimateReadingTime(formData.body)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{post ? "Edit Post" : "Create New Post"}</h1>
          <p className="text-muted-foreground">
            {post ? "Update your blog post" : "Write and publish a new blog post"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => onPreview(formData)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Write your blog post content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug">URL Slug</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-slug" checked={autoGenerateSlug} onCheckedChange={setAutoGenerateSlug} />
                    <Label htmlFor="auto-slug" className="text-sm">
                      Auto-generate
                    </Label>
                  </div>
                </div>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="post-url-slug"
                  disabled={autoGenerateSlug}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-excerpt"
                      checked={autoGenerateExcerpt}
                      onCheckedChange={setAutoGenerateExcerpt}
                    />
                    <Label htmlFor="auto-excerpt" className="text-sm">
                      Auto-generate
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your post..."
                  disabled={autoGenerateExcerpt}
                  rows={3}
                />
              </div>

              <div>
                <Label>Content</Label>
                <RichEditor
                  value={formData.body}
                  onChange={(body) => setFormData((prev) => ({ ...prev, body }))}
                  placeholder="Start writing your post..."
                />
                <p className="text-sm text-muted-foreground mt-2">Estimated reading time: {readingTime} min</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(status) => setFormData((prev) => ({ ...prev, status }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.publishedAt && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.publishedAt ? format(formData.publishedAt, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.publishedAt}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, publishedAt: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(featuredImage) => setFormData((prev) => ({ ...prev, featuredImage }))}
                placeholder="Upload featured image"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={formData.categoryIds.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData((prev) => ({
                            ...prev,
                            categoryIds: [...prev.categoryIds, category.id],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            categoryIds: prev.categoryIds.filter((id) => id !== category.id),
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <TagInput
                tags={tags}
                selectedTagIds={formData.tagIds}
                onChange={(tagIds) => setFormData((prev) => ({ ...prev, tagIds }))}
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tagIds.map((tagId) => {
                  const tag = tags.find((t) => t.id === tagId)
                  return tag ? (
                    <Badge key={tag.id} variant="secondary" className="text-xs">
                      {tag.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            tagIds: prev.tagIds.filter((id) => id !== tagId),
                          }))
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ) : null
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
