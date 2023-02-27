import { createApiRoute } from "@root/libs/api";
import { RESPONSE_MESSAGE } from "@root/constants";

export default createApiRoute({
  async post(req, res, ctx) {
    const category = req.body
    const response = await ctx.categoryService.insertCategory(category)

    if(response == null) {
      ctx.logger.log('info', `Insert category failed`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })   
    }

    ctx.logger.log('info', `Insert category successfull id: ${response.id}`)

    return res.status(201).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  async get(req, res, ctx) {
    const response = await ctx.categoryService.getAllCategory()

    if(response == null) {
      ctx.logger.log('info', `[CATEGORY] Something went wrong`)
      return res.status(500).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })   
    }

    ctx.logger.log('info', `Get all category successfull`)

    return res.status(200).json({
      status: res.statusCode,
      data: response,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
