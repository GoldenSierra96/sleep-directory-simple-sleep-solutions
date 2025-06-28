import { BlogPostForm } from "@/components/blog/blog-post-form"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"

async function getFormData() {
  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ])

  return { categories, tags }
}

export default async function NewBlogPostPage() {
  const { categories, tags } = await getFormData()

  const handleSave = async (data: any) => {
    "use server"

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        body: data.body,
        featuredImage: data.featuredImage,
        status: data.status,
        publishedAt: data.publishedAt,
        authorId: "user-id", // Get from session
        categories: {
          connect: data.categoryIds.map((id: string) => ({ id })),
        },
        tags: {
          connect: data.tagIds.map((id: string) => ({ id })),
        },
      },
    })

    redirect(`/admin/blog/${post.id}/edit`)
  }

  const handlePublish = async (data: any) => {
    "use server"

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        body: data.body,
        featuredImage: data.featuredImage,
        status: "PUBLISHED",
        publishedAt: data.publishedAt || new Date(),
        authorId: "user-id", // Get from session
        categories: {
          connect: data.categoryIds.map((id: string) => ({ id })),
        },
        tags: {
          connect: data.tagIds.map((id: string) => ({ id })),
        },
      },
    })

    redirect(`/blog/${post.slug}`)
  }

  const handlePreview = (data: any) => {
    // Store in session/temp storage for preview
    console.log("Preview:", data)
  }

  return (
    <BlogPostForm
      categories={categories}
      tags={tags}
      onSave={handleSave}
      onPublish={handlePublish}
      onPreview={handlePreview}
    />
  )
}
