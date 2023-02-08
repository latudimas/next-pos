import { Logger } from '@libs/logger'
import { DbConnection } from '@libs/database'
import { ProductForm } from '@root/types'

export const productService = (logger: Logger, dbConnection: DbConnection) => {
  const productDb = dbConnection.getConnection().product

  const insertProduct = async (product: ProductForm) => {
    try {
      logger.log('info', `[SERVICE] Insert product: ${JSON.stringify(product)}`)
      return await productDb.create({
        data: {
          ... product
        }
      })
    } catch (error) {
      logger.log('error', `[SERVICE] Error when insert product: ${error}`)
      throw new Error('Error when insert product')
    }
  }

  const getAllProduct = async (limit: number, offset: number, keyword: string | undefined) => {
    try {
      logger.log('info', `[SERVICE] get all product`)
      const data = await productDb.findMany({
        skip: offset,
        take: limit,
        where: {
          productName: {
            search: keyword,
          },
        },
        orderBy: {
          id: 'asc'}
      })
        return data
    } catch (error) {
      logger.log('error', `[SERVICE] Error when get all product: ${error}`)
      throw new Error('Error when get all product')
    }
  }

  const getProductByBarcode = async (barcode: string) => {
    try {
      const product = await productDb.findFirst({
        where: {
          barcode: barcode
        }
      })
      logger.log('info', `[SERVICE] Product with barcode ${barcode}: ${JSON.stringify(product)}`)
      return product
    } catch(error) {
      logger.log('error', `[SERVICE] Error when get product by barcode: ${error}`)
      throw new Error(`Error when get product with barcode ${barcode}`)
    }
    
  }

  const updateProduct = async (barcode: string, product: ProductForm) => {
    try {
      return await productDb.update({
        where: {
          barcode
        },
        data: {
          ...product
        }
      })
    } catch(error) {
      logger.log('error', `[SERVICE] Error when get update product with barcode: ${barcode}`)
      throw new Error(`Error when update product with barcode ${barcode}, Error: ${error}`)
    }
  }

  const deleteProduct = async (barcode: string) => {
    try{
      return await productDb.delete({
        where: {
          barcode
        }
      })
    } catch (error) {
      logger.log('error', `[SERVICE] Error when get delete product with barcode: ${barcode}`)
      throw new Error(`Error when delete product with barcode ${barcode}, Error: ${error}`)
    }
  }

  return {
    insertProduct,
    getAllProduct,
    getProductByBarcode,
    updateProduct,
    deleteProduct
  }
} 
