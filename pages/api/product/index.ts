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
  }
})
