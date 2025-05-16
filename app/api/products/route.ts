import { NextResponse } from 'next/server';
import { delay, getProducts, saveProducts } from '@/lib/helpers';

export async function GET() {
  await delay(Math.floor(Math.random() * 500) + 300);
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error, ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await delay(Math.floor(Math.random() * 100) + 300);
  try {
    const { name, description, price, category, stock } = await request.json();
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      description,
      price,
      category,
      stock,
    };
    const products = await getProducts();
    const updatedProducts = [...products, newProduct];
    await saveProducts(updatedProducts);
    console.log('updatedProducts', updatedProducts);
    return NextResponse.json(
      { message: 'Product created successfully', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
