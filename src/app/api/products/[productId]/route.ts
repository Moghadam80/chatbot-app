import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';

type Params = {
  params: Promise<{
    productId: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: Params
) {
  try {
    const { productId } = await context.params;

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
