import cors from 'cors'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

import { createApiRouteCreator } from './createApiRouteCreator'
import * as ProductService from '@services/product'
import initMiddleware from './initMiddleware'
import logger from '@libs/logger'

// Cors middleware
const corsMiddleware = initMiddleware(cors())
// Logger middleware
const loggerMiddleware = async({ method, url, query, body }: Req) => {
  let queryString = JSON.stringify(query)
  let bodyString = JSON.stringify(body)
  logger.info(`${method} ${url} query: ${queryString} body: ${bodyString}`)
}

export const createApiRoute = createApiRouteCreator({
  middleware: [corsMiddleware, loggerMiddleware],
  unimplementedMethod(req, res) {
    res.status(405).json({ message: "Unimplemented" })
  },
  createContext() {
    return {
      productService: ProductService
    }
  },
  handleError(req, res, error) {
    if (typeof error === "string") {
      return res.status(400).send({ message: error })
    }
    res.status(400).send({ message: "Something went wrong!" })
  }
})
