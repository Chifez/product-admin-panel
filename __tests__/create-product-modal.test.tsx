"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CreateProductModal } from "@/components/create-product-modal"
import { useProductStore } from "@/store/product-store"

// Mock the Zustand store
jest.mock("@/store/product-store", () => ({
  useProductStore: jest.fn(),
}))

describe("CreateProductModal", () => {
  const mockAddProduct = jest.fn()
  const mockOnClose = jest.fn()

  beforeEach(() => {
    ;(useProductStore as jest.Mock).mockReturnValue({
      addProduct: mockAddProduct,
      categories: ["Electronics", "Clothing", "Home", "Books"],
    })
  })

  it("renders the modal when isOpen is true", () => {
    render(<CreateProductModal isOpen={true} onClose={mockOnClose} />)

    expect(screen.getByText("Create New Product")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Description")).toBeInTheDocument()
    expect(screen.getByLabelText("Price ($)")).toBeInTheDocument()
    expect(screen.getByLabelText("Stock")).toBeInTheDocument()
    expect(screen.getByText("Select a category")).toBeInTheDocument()
  })

  it("doesn't render the modal when isOpen is false", () => {
    render(<CreateProductModal isOpen={false} onClose={mockOnClose} />)

    expect(screen.queryByText("Create New Product")).not.toBeInTheDocument()
  })

  it("submits the form with valid data", async () => {
    render(<CreateProductModal isOpen={true} onClose={mockOnClose} />)

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New Product" } })
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "Product description" } })
    fireEvent.change(screen.getByLabelText("Price ($)"), { target: { value: "99.99" } })
    fireEvent.change(screen.getByLabelText("Stock"), { target: { value: "10" } })

    // Open the select dropdown and select a category
    fireEvent.click(screen.getByText("Select a category"))
    fireEvent.click(screen.getByText("Electronics"))

    fireEvent.click(screen.getByText("Create Product"))

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Product",
          description: "Product description",
          price: 99.99,
          category: "Electronics",
          stock: 10,
        }),
      )
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  it("shows validation errors for invalid data", async () => {
    render(<CreateProductModal isOpen={true} onClose={mockOnClose} />)

    // Submit without filling any fields
    fireEvent.click(screen.getByText("Create Product"))

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument()
      expect(screen.getByText("Description is required")).toBeInTheDocument()
      expect(screen.getByText("Price is required")).toBeInTheDocument()
      expect(screen.getByText("Stock is required")).toBeInTheDocument()
      expect(screen.getByText("Category is required")).toBeInTheDocument()
    })

    expect(mockAddProduct).not.toHaveBeenCalled()
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
