import { render, screen, fireEvent } from "@testing-library/react"
import { ProductTable } from "@/components/product-table"
import { useProductStore } from "@/store/product-store"

// Mock the Zustand store
jest.mock("@/store/product-store", () => ({
  useProductStore: jest.fn(),
}))

describe("ProductTable", () => {
  const mockProducts = [
    {
      id: "1",
      name: "Test Product 1",
      description: "Description 1",
      price: 99.99,
      category: "Electronics",
      stock: 10,
    },
    {
      id: "2",
      name: "Test Product 2",
      description: "Description 2",
      price: 49.99,
      category: "Clothing",
      stock: 20,
    },
  ]

  const mockFetchProducts = jest.fn()
  const mockDeleteProduct = jest.fn()
  const mockOnEditProduct = jest.fn()

  beforeEach(() => {
    ;(useProductStore as jest.Mock).mockReturnValue({
      products: mockProducts,
      fetchProducts: mockFetchProducts,
      deleteProduct: mockDeleteProduct,
      categories: ["Electronics", "Clothing", "Home", "Books"],
    })
  })

  it("renders the product table with products", () => {
    render(<ProductTable onEditProduct={mockOnEditProduct} />)

    expect(mockFetchProducts).toHaveBeenCalled()
    expect(screen.getByText("Test Product 1")).toBeInTheDocument()
    expect(screen.getByText("Test Product 2")).toBeInTheDocument()
    expect(screen.getByText("$99.99")).toBeInTheDocument()
    expect(screen.getByText("$49.99")).toBeInTheDocument()
  })

  it("filters products by search query", () => {
    render(<ProductTable onEditProduct={mockOnEditProduct} />)

    const searchInput = screen.getByPlaceholderText("Search products...")
    fireEvent.change(searchInput, { target: { value: "Product 1" } })

    expect(screen.getByText("Test Product 1")).toBeInTheDocument()
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument()
  })

  it("calls onEditProduct when edit button is clicked", () => {
    render(<ProductTable onEditProduct={mockOnEditProduct} />)

    const editButtons = screen.getAllByLabelText("Edit")
    fireEvent.click(editButtons[0])

    expect(mockOnEditProduct).toHaveBeenCalledWith(mockProducts[0])
  })

  it("calls deleteProduct when delete button is clicked", () => {
    render(<ProductTable onEditProduct={mockOnEditProduct} />)

    const deleteButtons = screen.getAllByLabelText("Delete")
    fireEvent.click(deleteButtons[0])

    expect(mockDeleteProduct).toHaveBeenCalledWith(mockProducts[0].id)
  })
})
