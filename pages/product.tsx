import SidebarLayout from "@components/layouts"
import { 
  useState,
  useEffect, 
  ReactElement 
} from "react"
import useSWR from 'swr'

import { NextPageWithLayout } from './_app'

const Product: NextPageWithLayout = () => {
  // const [data, setData] = useState(null)
  // useEffect(() => {
  //   async function fetchData() {
  //     const productApiUrl = 'https://dummyjson.com/products/1'
  //     const response = await fetch(productApiUrl)
  //     const responseJson = await response.json()
  //     setData(responseJson)
  //   }
  //   fetchData()
  // }, [])
  // if (!data) return <h2>Loading...</h2>

  const productApiUrl = 'http://localhost:3000/api/product/12345'
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(productApiUrl, fetcher)

  if (error) return <p>Loading failed....</p>
  // if (!data) return <h1>Loading...</h1>
  if (isLoading) return <h2>Loading...</h2>

  return (
    <div>
      <div className="container">
      <p>Product page</p>
        {/* <div className="details">
          <p>Id: {data.data.id}</p>
          <p>Barcode: {data.data.barcode}</p>
          <p>Product Name: {data.data.productName}</p>
          <p>Category Id: {data.data.categoryId}</p>
          <p>Unit Id: {data.data.unitId}</p>
          <p>Created at: {data.data.createdAt}</p>
          <p>Updated at: {data.data.updatedAt}</p>
        </div> */}
        {JSON.stringify(data)}
      </div>
    </div>
  )
}

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  )
}

export default Product