import { NextResponse } from "next/server";
import products from "@/data/products.json";

export const dynamic = 'force-dynamic';  // Disable caching at the route level
export const runtime = 'nodejs';  // Ensure Node.js runtime

export async function GET() {
  try {
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
} 