export type ProductCategory = "Electronics" | "Clothing" | "Home" | "Books"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  stock: number
}
