import BrandForm from "@/components/admin/brand-form";
import { getCategories, getBrandById } from "@/lib/data";
import { updateBrand } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function EditBrandPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();
  const brand = await getBrandById(params.id);

  async function handleSave(data: any) {
    'use server';
    await updateBrand(params.id, data);
    redirect("/admin/brands");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Brand</h1>
      <BrandForm categories={categories} initialData={brand} onSave={handleSave} />
    </div>
  );
} 