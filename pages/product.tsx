import { 
  useState,
  useEffect, 
  ReactElement, 
  ReactNode
} from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"

import { NextPageWithLayout } from './_app'
import SidebarLayout from "@components/layouts"

interface Product {
  id: number;
  productName: string;
  barcode: string;
  category: string;
  unit: string;
}

// export default function Product({data}: InferGetStaticPropsType<typeof getStaticProps>): NextPageWithLayout {
const Product: NextPageWithLayout = ({data}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchInput, setSearchInput] = useState('')
  const [products, setProducts] = useState<Product[]>(data?.data ?? [])

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const productApiUrl = `http://localhost:3000/api/product?&search=${searchInput}`
    try {
      const response = await (await fetch(productApiUrl)).json()
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value)
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
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-black border-red-600">
              <th>No.</th>
              <th>ID</th>
              <th>Barcode</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: Product, index: number) => 
              <tr key={item.id} className="text-center">
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.barcode}</td>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>{item.unit}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
  
export const getStaticProps: GetStaticProps = async () => {
  const productApiUrl = `http://localhost:3000/api/product`
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
