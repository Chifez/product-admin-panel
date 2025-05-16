import { create } from "zustand"
import type { Product, ProductCategory } from "@/types/product"
import { mockProducts } from "@/lib/mock-data"

interface ProductState {
  products: Product[]
  categories: ProductCategory[]
  isLoading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: ["Electronics", "Clothing", "Home", "Books"],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 500))
      set({ products: mockProducts, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch products",
        isLoading: false,
      })
    }
  },

  addProduct: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
    }))
  },

  updateProduct: (updatedProduct: Product) => {
    set((state) => ({
      products: state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    }))
  },

  deleteProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
  },
}))
