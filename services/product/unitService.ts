import { Logger } from "@libs/logger";
import { DbConnection } from "@libs/database";
import { ProductUnit } from "@root/types";

export const unitService = (logger: Logger, dbConnection: DbConnection) => {
  const unitDb = dbConnection.getConnection().productUnit

  const insertUnit = async(unit: ProductUnit) => {
    try {
      logger.log('info', `Insert unit: ${JSON.stringify(unit)}`)
      return await unitDb.create({
        data: {
          ...unit
        }
      })
    } catch (error) {
      logger.log('info', `Error when insert unit: ${error}`)
      throw new Error('Error when insert unit')
    }
  }

  const getAllUnit = async() => {
    try {
      const units = await unitDb.findMany()
      return units
    } catch (error) {
      logger.log('error', 'Error when get all unit')
    }
  }

  const getUnitById = async(id: number) => {
    try{
      const unit = await unitDb.findFirst({
        where: {
          id
        }
      })
      logger.log('info', `Query result: ${JSON.stringify(unit)}`)
      return unit
    } catch (error) {
      logger.log('error', `Error when get unit with id:${id}`)
      throw new Error(`Error when get unit with id: ${id}`)
    }
  }

  const updateUnit = async(id: number, input: ProductUnit) => {
    try {
      const unit = await unitDb.update({
        where: {
          id
        },
        data: {
          ...input
        }
      })
      logger.log('info', `Updated unit: ${unit} `)
      return unit
    } catch (error) {
      logger.log('error', `Error when update unit with id: ${id}`)
      throw new Error(`Error when update unit with id: ${id}`)
    }
  }

  const deleteUnit = async (id: number) => {
    try {
      const deletedUnit = unitDb.delete({
        where: {
          id
        }
      })
      logger.log('info', `Deleted unit: ${deletedUnit}`)
      return deletedUnit
    } catch (error) {
      logger.log('error', `Error when delete unit with id: ${id}`)
      throw new Error(`Error when delete unit with id: ${id}`)
    }
  }

  return {
    insertUnit,
    getAllUnit,
    getUnitById,
    updateUnit,
    deleteUnit
  }
}
