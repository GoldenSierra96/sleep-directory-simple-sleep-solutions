import { CollectionPage } from "@/components/CollectionPage";
import { categoryData } from "../categoryData";
import { GetServerSidePropsContext } from "next";

interface CategoryPageProps {
  params: {
    category: keyof typeof categoryData;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const data = categoryData[params.category];
  if (!data) return <div>Category not found</div>;
  return <CollectionPage data={data} />;
} 