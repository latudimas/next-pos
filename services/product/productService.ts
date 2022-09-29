import { prisma } from '@root/libs'
import { ProductForm } from '@root/types'

export const createProduct = async (product: ProductForm) => {
  return await prisma.product.create({
    data: {
      ...product
    }
  })
}

export const getProductByBarcode = async (barcode: string) => {
  return await prisma.product.findFirst({
    where: {
      barcode: barcode
    }
  })
}
