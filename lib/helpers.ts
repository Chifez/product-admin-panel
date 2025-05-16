import { mockProducts } from './mock-data';

export const getProducts = async () => {
  if (window !== undefined) {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
  }
  return mockProducts;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
