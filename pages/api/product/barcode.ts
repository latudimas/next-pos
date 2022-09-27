import type { NextApiRequest, NextApiResponse } from 'next'

import { ProductForm } from '@root/types'
import { getProductByBarcode } from 'services/product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var data = await getProductByBarcode("12345")


  res.status(200).json({ })
}
