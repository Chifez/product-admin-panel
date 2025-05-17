import { Product, ProductCategory } from '@/types/product';
import { mockProducts } from './mock-data';

let serverProducts: Product[] = [...mockProducts];

export const getProducts = async () => {
  if (typeof window !== 'undefined') {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : mockProducts;
  }

  return serverProducts;
};

export async function saveProducts(products: Product[]) {
  try {
    if (typeof window !== 'undefined') {
      // Client-side: use localStorage
      localStorage.setItem('products', JSON.stringify(products));
    }
    // Server-side: update in-memory storage
    serverProducts = [...products];
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    throw error;
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// export const getCategoryBadgeColor = (category: ProductCategory) => {
//   switch (category) {
//     case 'Electronics':
//       return '!bg-blue-100 !text-blue-800';
//     case 'Clothing':
//       return '!bg-purple-100 !text-purple-800';
//     case 'Home':
//       return '!bg-green-100 !text-green-800';
//     case 'Books':
//       return '!bg-amber-100 !text-amber-800';
//     default:
//       return '!bg-gray-100 !text-gray-800';
//   }
// };
