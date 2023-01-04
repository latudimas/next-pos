import { createApiRoute } from "@root/libs/api";
import { RESPONSE_MESSAGE } from "@root/constants";

export default createApiRoute({
  //GET
  async get(req, res, ctx) {
    const { id } = req.query
    const categoryResult = await ctx.categoryService.getCategoryById(Number(id))

    if (Response == null) {
      return res.status(200).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }

    ctx.logger.log('info', `code: 200 category:${categoryResult}`)
   
    return res.status(200).json({
      status: res.statusCode,
      data: categoryResult,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  //PATCH
  async patch(req, res, ctx)  {
    const { id } = req.query
    const categoryInput = req.body
    const categoryUpdated = await ctx.categoryService.updateCategory(Number(id), categoryInput)

    if (categoryUpdated == null) {
      ctx.logger.log('info', `Category with id: ${id} Not found`)
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND
      })
    }

    ctx.logger.log('info', `success update category: ${categoryUpdated}`)
    
    return res.status(200).json({
      status: res.statusCode,
      data: categoryUpdated,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  },
  //DELETE
  async delete(req, res, ctx) {
    const { id } = req.query
    const deletedCategory = await ctx.categoryService.deleteCategory(Number(id))

    if(deletedCategory == null) {
      ctx.logger.log('info', `Failed to delete the category with id: ${id}`)
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED
      })
    }

    ctx.logger.log('info', `success delete category with id ${id}`)

    return res.status(200).json({
      status: res.statusCode,
      data: deletedCategory,
      message: RESPONSE_MESSAGE.SUCCESS
    })
  }
})
