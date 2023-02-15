import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  // CREATE product
  async post(req, res, ctx) {
    const product = req.body
    const response = await ctx.productService.insertProduct(product)

    if (response == null) {
      ctx.logger.log('info', `Code: 500 Message: Insert product failed`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })
    }

    ctx.logger.log('info', `code: 200 response:${response} `)
    return res.status(201).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  //GET paginated products, include optional params limit, offset and keyword  
  async get(req,res, ctx) {
    // params
    const params = req.query
    const page: number = Number(params.page) || 1
    const limit: number = Number(params.limit) || 10
    const search = params.search ? params.search as string : undefined

    const count = await ctx.productService.getProductCountByName(search) // querying total items, separate the query because prisma :(
    const totalPages = Math.ceil(count/limit)
    const currentPage = Math.max(1, Math.min(page, totalPages))
    const offset = (currentPage - 1) * limit

    const response = await ctx.productService.getProductsByName(limit, offset, search) // querying data
 
    if (response == null) {
      ctx.logger.log('info', `Code: 500 Message: Get all product failed`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })
    }

    ctx.logger.log('info', `code: 200 response:${response} `)
    return res.status(200).json({
      status: res.statusCode,
      pageInfo: {
        currentPage,
        perPage: limit,
        totalItems: count,
        totalPages
      },
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
