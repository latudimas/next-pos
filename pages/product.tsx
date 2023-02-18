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
  // TODO: handle if request is failed, error, or data not available
  const [list, setList] = useState<Product[]>(data?.data ?? [])

  useEffect(() => {
    setList(data?.data ?? [])
  }, [data])

  // Todo: styling the table (or possibly create table component) also create an input form for accept params
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Barcode</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item: Product) => 
            <tr key={item.id}>
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
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Todo: using input to get params from user
  const productApiUrl = 'http://localhost:3000/api/product?limit=20&page=1&search=product'

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
