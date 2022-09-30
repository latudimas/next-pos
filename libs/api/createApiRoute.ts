import cors from 'cors'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

import { createApiRouteCreator } from './createApiRouteCreator'
import * as ProductService from '@services/product'
import initMiddleware from './initMiddleware'

const corsMiddleware = initMiddleware(cors())
const loggerMiddleware = async(req: Req) => {
  console.log("Incoming", req.method, "request")
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
