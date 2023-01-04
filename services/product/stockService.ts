import { Logger } from "@libs/logger";
import { DbConnection } from "@libs/database";
import { ProductStock } from "@root/types";

export const stockService = (logger: Logger, dbConnection: DbConnection) => {
  const stockDb = dbConnection.getConnection().productStock

  const insertStock = async(stock: ProductStock) => {
    try {
      logger.log('info', `Insert stock: ${JSON.stringify(stock)}`)
      return await stockDb.create({
        data: {
          ...stock
        }
      })
    } catch (error) {
      logger.log('info', `Error when insert stock: ${error}`)
      throw new Error('Error when insert stock')
    }
  }

  const getStockByBarcode = async(barcode: string) => {
    try{
      const stock = await stockDb.findFirst({
        where: {
          productBarcode: barcode
        }
      })
      logger.log('info', `Query result: ${JSON.stringify(stock)}`)
      return stock
    } catch (error) {
      logger.log('error', `Error when get stock with barcode:${barcode}`)
      throw new Error(`Error when get stock with barcode: ${barcode}`)
    }
  }

  const updateStock = async(barcode: string, input: ProductStock) => {
    try {
      const stock = await stockDb.update({
        where: {
          productBarcode: barcode
        },
        data: {
          ...input
        }
      })
      logger.log('info', `Updated stock: ${stock} `)
      return stock
    } catch (error) {
      logger.log('error', `Error when update stock with barcode: ${barcode}`)
      throw new Error(`Error when update stock with barcode: ${barcode}`)
    }
  }

  const deleteStock = async (barcode: string) => {
    try {
      const deletedStock = stockDb.delete({
        where: {
          productBarcode: barcode
        }
      })
      logger.log('info', `Deleted stock: ${deletedStock}`)
      return deletedStock
    } catch (error) {
      logger.log('error', `Error when delete stock with barcode: ${barcode}`)
      throw new Error(`Error when delete stock with barcode: ${barcode}`)
    }
  }

  return {
    insertStock,
    getStockByBarcode,
    updateStock,
    deleteStock
  }
}
