import BrandForm from "@/components/admin/brand-form";
import { getCategories } from "@/lib/data";
import { createBrand } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function NewBrandPage() {
  const categories = await getCategories();

  async function handleSave(data: any) {
    'use server';
    await createBrand(data);
    redirect("/admin/brands");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Brand</h1>
      <BrandForm categories={categories} onSave={handleSave} />
    </div>
  );
} 