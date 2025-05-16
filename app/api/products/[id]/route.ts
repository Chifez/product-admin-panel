import { delay, getProducts } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export async function PUT({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  await delay(Math.floor(Math.random() * 100) + 300);
  try {
    const { id } = params;
    const { name, description, price, category } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }
    const products = await getProducts();
    const product = products.find((p: any) => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    if (!name && !description && !price && !category) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }
    const updatedProduct = {
      ...product,
      name,
      description,
      price,
      category,
    };
    const updatedProducts = products.map((p: any) =>
      p.id === id ? updatedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return NextResponse.json(
      { message: 'Product updated successfully', product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  await delay(Math.floor(Math.random() * 100) + 300);
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }
    const products = await getProducts();
    const product = products.find((p: any) => p.id == id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    const updatedProducts = products.filter((p: any) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
