import axios from 'axios';
import { saveProducts } from '../helpers';
import type { Product } from '../../types/product';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  initializeProducts: async () => {
    if (typeof window !== 'undefined' && !localStorage.getItem('products')) {
      const { data } = await api.get<Product[]>('/products');
      await saveProducts(data);
    }
  },
  getAllProducts: async () => {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },
  getProductById: async (id: string) => {
    const { data } = await api.get<Product[]>(`/products/${id}`);
    return data;
  },
  createProduct: async (product: Product) => {
    const { data } = await api.post('/products', product);
    return data;
  },
  updateProduct: async (id: string, product: Product) => {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  },
  deleteProduct: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};
