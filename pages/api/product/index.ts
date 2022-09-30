import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  async post(req, res, ctx) {
    const data = req.body
    const response = await ctx.productService.createProduct(data)
    
    return res.status(201).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
})
