import { delay, getProducts, saveProducts } from '@/lib/helpers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }
    const products = await getProducts();
    const product = products.find((p: any) => p.id == id);
    if (!product) {
      return NextResponse.json({ rror: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('PUT request received with params:', params);
  await delay(Math.floor(Math.random() * 100) + 300);
  try {
    const { id } = params;
    console.log('Attempting to update product with id:', id);
    const body = await request.json();
    console.log('Request body:', body);
    const { name, description, price, category } = body;
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
    await saveProducts(updatedProducts);
    return NextResponse.json(
      { message: 'Product updated successfully', product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('DELETE request received with params:', params);
  await delay(Math.floor(Math.random() * 100) + 300);
  try {
    const { id } = params;
    console.log('Attempting to delete product with id:', id);
    if (!id) {
      console.log('No id provided in params');
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }
    const products = await getProducts();
    console.log('Current products:', products);
    const product = products.find((p: any) => p.id == id);
    if (!product) {
      console.log('Product not found with id:', id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    const updatedProducts = products.filter((p: any) => p.id !== id);
    console.log('Updated products after deletion:', updatedProducts);
    saveProducts(updatedProducts);
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json(
      { error: `Internal server error ${error}` },
      { status: 500 }
    );
  }
}
