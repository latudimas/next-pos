import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  // GET product by barcode  
  async get(req, res, ctx) {
    const { barcode } = req.query
    const response = await ctx.productService.getProductByBarcode(barcode as string)
    
    if (response == null) {
      res.status(200).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }
    
    res.status(200).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
})
