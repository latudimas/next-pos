import SidebarLayout from "@components/layouts"
import { ReactElement } from "react"

export default function Product() {
  return (
    <>
      <h1 className="text-blue-500">This is product page</h1>
    </>
  )
}

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  )
}