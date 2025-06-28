"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BrandForm({ categories, onSave, initialData }: { categories: any[]; onSave: (data: any) => void; initialData?: any }) {
  const [form, setForm] = useState(initialData || {
    name: "",
    slug: "",
    logo: "",
    description: "",
    websiteUrl: "",
    categoryIds: [],
    tags: [],
    locations: [],
    isOnline: true,
    socialLinks: { instagram: "", facebook: "", tiktok: "" },
    featured: false,
    awards: [],
    productGallery: [],
  });

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f: any) => ({ ...f, [name]: checked }));
    } else {
      setForm((f: any) => ({ ...f, [name]: value }));
    }
  }

  function handleCategoryChange(id: string, checked: boolean) {
    setForm((f: any) => ({
      ...f,
      categoryIds: checked ? [...f.categoryIds, id] : f.categoryIds.filter((c: string) => c !== id),
    }));
  }

  function handleTagChange(e: any) {
    setForm((f: any) => ({ ...f, tags: e.target.value.split(",").map((t: string) => t.trim()) }));
  }

  function handleLocationsChange(e: any) {
    setForm((f: any) => ({ ...f, locations: e.target.value.split(",").map((l: string) => l.trim()) }));
  }

  function handleAwardsChange(e: any) {
    setForm((f: any) => ({ ...f, awards: e.target.value.split(",").map((a: string) => a.trim()) }));
  }

  function handleGalleryChange(e: any) {
    setForm((f: any) => ({ ...f, productGallery: e.target.value.split(",").map((g: string) => g.trim()) }));
  }

  function handleSocialChange(e: any) {
    const { name, value } = e.target;
    setForm((f: any) => ({ ...f, socialLinks: { ...f.socialLinks, [name]: value } }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <Input name="slug" value={form.slug} onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-medium mb-1">Logo URL</label>
          <Input name="logo" value={form.logo} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Website URL</label>
          <Input name="websiteUrl" value={form.websiteUrl} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2 min-h-[80px]" />
      </div>
      <div>
        <label className="block font-medium mb-1">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.categoryIds.includes(cat.id)}
                onChange={(e) => handleCategoryChange(cat.id, e.target.checked)}
              />
              <Badge variant="outline">{cat.name}</Badge>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <Input name="tags" value={form.tags.join(", ")} onChange={handleTagChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Locations (comma separated)</label>
          <Input name="locations" value={form.locations.join(", ")} onChange={handleLocationsChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Awards (comma separated)</label>
          <Input name="awards" value={form.awards.join(", ")} onChange={handleAwardsChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Product Gallery (comma separated URLs)</label>
          <Input name="productGallery" value={form.productGallery.join(", ")} onChange={handleGalleryChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Instagram</label>
          <Input name="instagram" value={form.socialLinks.instagram} onChange={handleSocialChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Facebook</label>
          <Input name="facebook" value={form.socialLinks.facebook} onChange={handleSocialChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">TikTok</label>
          <Input name="tiktok" value={form.socialLinks.tiktok} onChange={handleSocialChange} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isOnline" checked={form.isOnline} onChange={handleChange} />
          Online Only
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          Featured
        </label>
      </div>
      <Button type="submit">Save Brand</Button>
    </form>
  );
} 