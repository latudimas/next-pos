import { Logger } from "@libs/logger";
import { DbConnection } from "@libs/database";
import { ProductCategory } from "@root/types";

export const categoryService = (logger: Logger, dbConnection: DbConnection) => {
  const categoryDb = dbConnection.getConnection().productCategory

  const insertCategory = async(category: ProductCategory) => {
    try {
      logger.log('info', `Insert Category: ${JSON.stringify(category)}`)
      return await categoryDb.create({
        data: {
          ...category
        }
      })
    } catch (error) {
      logger.log('info', `Error when insert category: ${error}`)
      throw new Error('Error when insert product')
    }
  }

  const getAllCategory = async() => {
    try {
      const categories = await categoryDb.findMany()
      return categories
    } catch (error) {
      logger.log('error', 'Error when get all category')
    }
  }

  const getCategoryById = async(id: number) => {
    try{
      const category = await categoryDb.findFirst({
        where: {
          id
        }
      })
      logger.log('info', `Query result: ${JSON.stringify(category)}`)
      return category
    } catch (error) {
      logger.log('error', `Error when get category with id:${id}`)
      throw new Error(`Error when get product with id: ${id}`)
    }
  }

  const updateCategory = async(id: number, input: ProductCategory) => {
    try {
      const category = await categoryDb.update({
        where: {
          id
        },
        data: {
          ...input
        }
      })
      logger.log('info', `Updated category: ${category} `)
      return category
    } catch (error) {
      logger.log('error', `Error when update category with id: ${id}`)
      throw new Error(`Error when update category with id: ${id}`)
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      const deletedCategory = categoryDb.delete({
        where: {
          id
        }
      })
      logger.log('info', `Deleted category: ${deletedCategory}`)
      return deletedCategory
    } catch (error) {
      logger.log('error', `Error when delete category with id: ${id}`)
      throw new Error(`Error when delete category with id: ${id}`)
    }
  }

  return {
    insertCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
  }
}
