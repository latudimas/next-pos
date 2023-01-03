import cors from 'cors'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

import { createApiRouteCreator } from './createApiRouteCreator'
import initMiddleware from './initMiddleware'
import { createWinstonLogger } from '@libs/logger'
import { createDbConnection } from '@libs/database'
import { productService } from '@services/product'

// Logger initiation
const logger = createWinstonLogger()
// Db initiation
const dbConnection = createDbConnection()
dbConnection.connect()
// Service initiation
const productServiceObject = productService(logger, dbConnection)
// Cors middleware initiation
const corsMiddleware = initMiddleware(cors())
// Logger middleware
const loggerMiddleware = async({ method, url, query, body }: Req) => {
  let queryString = JSON.stringify(query)
  let bodyString = JSON.stringify(body)
  logger.log('info', `${method} ${url} query: ${queryString} body: ${bodyString}`)
}

export const createApiRoute = createApiRouteCreator({
  middleware: [corsMiddleware, loggerMiddleware],
  unimplementedMethod(req, res) {
    res.status(405).json({ message: "Unimplemented" })
  },
  createContext() {
    return {
      productService: productServiceObject,
      logger: logger
    }
  },
  handleError(req, res, error) {
    if (typeof error === "string") {
      return res.status(400).send({ message: error })
    }
    res.status(400).send({ message: "Something went wrong!" })
  }
})
