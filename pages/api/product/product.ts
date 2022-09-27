// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { ApiResponse } from '@root/types'
import {createProduct} from '@root/services'
import { Product } from '@prisma/client'


type Data = {
  message: string
}

type CustomResponseType = {
  status: number
  data: Product
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const dummyData = {
      barcode: "12349",
      productName: "Dummy Product 2",
      // categoryId: 123,
      // unitId: 123
    }

  const dataInserted = await createProduct(dummyData)

  res.status(200).json({
    status: res.statusCode,
    data: dataInserted,
    message: "Success Insert"
  })
}