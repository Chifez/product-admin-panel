"use client"

import { useState } from "react"
import { ProductTable } from "@/components/product-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CreateProductModal } from "@/components/create-product-modal"
import { EditProductModal } from "@/components/edit-product-modal"
import type { Product } from "@/types/product"

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product)
    setIsEditModalOpen(true)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Products"
        text="Manage your product inventory"
        onCreateClick={() => setIsCreateModalOpen(true)}
      />
      <ProductTable onEditProduct={handleEditProduct} />

      <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

      {productToEdit && (
        <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={productToEdit} />
      )}
    </DashboardShell>
  )
}
