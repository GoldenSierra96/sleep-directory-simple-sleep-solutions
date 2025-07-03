export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const product = mockProducts.find(p => p.slug === params.slug)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json({ product })
}
