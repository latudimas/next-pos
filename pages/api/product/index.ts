import { createApiRoute } from '@libs/api'

export default createApiRoute({
  // POST
  async post(req, res, ctx) {
    const data = req.body
    const response = await ctx.productService.createProduct(data)
    
    res.status(200).json({
      status: 200,
      data: response,
      message: "create product success"
    })
  },
})
