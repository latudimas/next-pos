import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  async post(req, res, ctx) {
    const stock = req.body
    const response = await ctx.stockService.insertStock(stock)

    if(response == null) {
      ctx.logger.log('info', `Insert stock failed`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })   
    }

    ctx.logger.log('info', `Insert stock successfull id: ${response.id}`)

    return res.status(201).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
