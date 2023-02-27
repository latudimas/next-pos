import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ReactElement, ReactNode, useState } from "react";

import { SidebarLayout } from "@root/components";
import { ProductForm } from "@root/components/form";
import { NextPageWithLayout } from "./_app";

const BASE_URL = process.env.POS_API_BASE_URL || "http://localhost:3000/api"

const ProductFormPage: NextPageWithLayout = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [units, setUnits] = useState(data?.units ?? [])
  const [categories, setCategories] = useState(data?.categories ?? [])

  return(
    <div>
      <ProductForm 
        categories={categories}
        units={units}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [unitsResponse, categoriesResponse] = await Promise.all([
    fetch(`${BASE_URL}/unit`),
    fetch(`${BASE_URL}/category`),
  ]);

  const [unitsData, categoriesData] = await Promise.all([
    unitsResponse.json(),
    categoriesResponse.json(),
  ]);

  const data = {
    units: unitsData.data,
    categories: categoriesData.data,
  };

  return {
    props: {
      data,
    },
  };
}

ProductFormPage.getLayout = (page: ReactElement): ReactNode => (
  <SidebarLayout>
    {page}
  </SidebarLayout>
)

export default ProductFormPage
