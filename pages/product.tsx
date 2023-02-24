import React, { 
  useState,
  ReactElement, 
  ReactNode,
} from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { NextPageWithLayout } from './_app'
import { SidebarLayout, Pagination, Table } from "@root/components"

interface Product {
  id: number;
  productName: string;
  barcode: string;
  category: string;
  unit: string;
}

interface PageInfo {
  currentPage: number,
  pageSize: number,
  totalItems: number,
  totalPages: number
}

//TODO: Create file type for reusability
interface Column {
  key: string
  label: string
}

const tableColumns: Column[] = [
  {key: "number", label: "No."},
  {key: "id", label: "ID"},
  {key: "barcode", label: "Barcode"},
  {key: "productName", label: "Product Name"},
  {key: "category", label: "Category"},
  {key: "unit", label: "Unit"},
]

const BASE_URL = process.env.POS_API_BASE_URL || "http://localhost:3000/api"

const Product: NextPageWithLayout = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchInput, setSearchInput] = useState('')
  const [products, setProducts] = useState<Product[]>(data?.data ?? [])
  const [pageInfo, setPageInfo] = useState<PageInfo>(data?.pageInfo)

  const fetchProducts = async (page: number, search?: string): Promise<void> => {
    const productApiUrl = `${BASE_URL}/product?page=${page}&search=${search}`
    try {
      const response = await fetch(productApiUrl)
      const data = await response.json()
      setProducts(data?.data ?? [])
      setPageInfo(data?.pageInfo ?? {})
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await fetchProducts(1, searchInput) // Make sure to start from page 1
    // setSearchInput('') // Cleanup the search box //TODO [optional] Handling cleanup searchbox
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
  }
  
  const handlePageChange = async (page: number) => {
    console.log(`URL => ${BASE_URL}`)
    console.log(`PENCET=> ${page}`)
    if (page !== pageInfo.currentPage) {
      await fetchProducts(page, searchInput)
    }
  }

  return (
    <div>
      <div>
        <h1>Products</h1>
        <form className="px-4 py-4" onSubmit={handleSearchSubmit}>
          <input 
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            type="submit">Search
          </button>
        </form>
      </div>
      <div className="px-8 py-8">
        <Table 
          columns={tableColumns}
          data={products}
        />
      </div>
        <Pagination
          totalPages={pageInfo.totalPages}
          currentPage={pageInfo.currentPage}
          onPageChange={handlePageChange}
        />
    </div>
  )
}
  
export const getStaticProps: GetStaticProps = async () => {
  const productApiUrl = `${BASE_URL}/product`
  const response = await fetch(productApiUrl)
  const data = await response.json()

  return {
    props: {
      data
    }
  }
}

Product.getLayout = function getLayout(page: ReactElement): ReactNode {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  )
}

export default Product
