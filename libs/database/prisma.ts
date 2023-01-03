import { PrismaClient } from '@prisma/client'

export type DbConnection = {
  connect: () => Promise<void>
  getConnection: () => PrismaClient
}

declare global {
  var __db: PrismaClient | undefined
}

export const createDbConnection = (): DbConnection => {
  let connection: PrismaClient

  const connect = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'production') {
      connection = new PrismaClient()
      connection.$connect()
    } else {
      if (!global.__db) {
        global.__db = new PrismaClient()
        global.__db.$connect()
      }

      connection = global.__db
    }
  }

  const getConnection = (): PrismaClient => {
    return connection
  }

  return { connect, getConnection }
}
