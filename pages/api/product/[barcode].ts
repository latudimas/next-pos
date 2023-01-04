import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  // GET product by barcode
  async get(req, res, ctx) {
    const { barcode } = req.query
    const response = await ctx.productService.getProductByBarcode(barcode as string)
    
    if (response == null) {
      return res.status(200).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }

    ctx.logger.log('info', `code: 200 response:${response} `)

    return res.status(200).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  // UPDATE product by barcode
  async patch(req, res, ctx) {
    const { barcode } = req.query
    const product = req.body
    const response = await ctx.productService.updateProduct(barcode as string, product)

    if (response == null) {
      ctx.logger.log('info', `Code: 404 Message: product with barcode ${barcode} Not Found`)
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }

    ctx.logger.log('info', `code: 200 response:${response} `)
    return res.status(200).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  // DELETE product by barcode
  async delete(req, res, ctx) {
    const { barcode } = req.query
    const deleteProduct = await ctx.productService.deleteProduct(barcode as string)
    
    if (deleteProduct == null) {
      ctx.logger.log('info', `Code: 404 Message: product with barcode ${barcode} Not Found`)
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }

    ctx.logger.log('info', `code: 200 response:${deleteProduct} `)
    return res.status(200).json({
      status: res.statusCode,
      data: deleteProduct,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
