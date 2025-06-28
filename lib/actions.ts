import { prisma } from "@/lib/db";

export async function createBrand(data: any) {
  return await prisma.brand.create({
    data: {
      ...data,
      categories: { connect: data.categoryIds?.map((id: string) => ({ id })) || [] },
    },
  });
}

export async function updateBrand(id: string, data: any) {
  return await prisma.brand.update({
    where: { id },
    data: {
      ...data,
      categories: { set: data.categoryIds?.map((id: string) => ({ id })) || [] },
    },
  });
} 