import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json'; // or wherever your product list is

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params; 
    

    const product = products.find((product) => product.id === productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
