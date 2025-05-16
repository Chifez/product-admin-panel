import { create } from 'zustand';
import type { Product, ProductCategory } from '@/types/product';
import { productService } from '@/lib/service/product-service';

interface ProductState {
  products: Product[];
  categories: ProductCategory[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  initializeProducts: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: ['Electronics', 'Clothing', 'Home', 'Books'],
  isLoading: false,
  isInitialized: false,
  error: null,
  initializeProducts: async () => {
    if (get().isInitialized) return;
    set({ isLoading: true, error: null });
    try {
      await productService.initializeProducts();
      await get().fetchProducts();
      set({ isLoading: false, isInitialized: true });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to initialize products',
      });
    }
  },
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await productService.getAllProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
        isLoading: false,
      });
    }
  },

  addProduct: async (product: Product) => {
    set({ error: null });
    try {
      const newProduct = await productService.createProduct(product);
      set((state) => ({
        products: [...state.products, newProduct],
      }));
      await get().fetchProducts();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add product',
      });
    }
  },

  updateProduct: async (Product: Product) => {
    set({ error: null });
    try {
      await productService.updateProduct(Product.id, Product);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === Product.id ? Product : p
        ),
      }));
      await get().fetchProducts();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to update product',
      });
    }
  },

  deleteProduct: async (id: string) => {
    set({ error: null });
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
      await get().fetchProducts();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to delete product',
      });
    }
  },
}));
