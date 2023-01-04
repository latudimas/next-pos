import { createApiRoute } from '@libs/api'
import { RESPONSE_MESSAGE } from '@root/constants'

export default createApiRoute({
  async post(req, res, ctx) {
    const unit = req.body
    const response = await ctx.unitService.insertUnit(unit)

    if(response == null) {
      ctx.logger.log('info', `Insert unit failed`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })   
    }

    ctx.logger.log('info', `Insert unit successfull id: ${response.id}`)

    return res.status(201).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
