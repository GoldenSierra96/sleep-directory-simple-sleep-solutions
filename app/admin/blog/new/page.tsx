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

export const dynamic = "force-dynamic"

export default function NewBlogPostPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          Blog post creation feature will be available after database setup is complete.
        </p>
      </div>
    </div>
  )
}
