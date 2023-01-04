import { createApiRoute } from "@libs/api";
import { RESPONSE_MESSAGE } from "@root/constants";

export default createApiRoute({
  //GET
  async get(req, res, ctx) {
    const { id } = req.query;
    const unitResult = await ctx.unitService.getUnitById(Number(id));

    if (Response == null) {
      ctx.logger.log("info", `code: 404 unit:${unitResult}`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      });
    }

    ctx.logger.log("info", `code: 200 unit:${unitResult}`);

    return res.status(200).json({
      status: res.statusCode,
      data: unitResult,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
  //PATCH
  async patch(req, res, ctx) {
    const { id } = req.query;
    const unitInput = req.body;
    const unitUpdated = await ctx.unitService.updateUnit(Number(id), unitInput);

    if (unitUpdated == null) {
      ctx.logger.log("info", `Unit with id: ${id} Not found`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      });
    }

    ctx.logger.log("info", `success update unit: ${unitUpdated}`);

    return res.status(200).json({
      status: res.statusCode,
      data: unitUpdated,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
  //DELETE
  async delete(req, res, ctx) {
    const { id } = req.query;
    const deletedUnit = await ctx.unitService.deleteUnit(
      Number(id)
    );

    if (deletedUnit == null) {
      ctx.logger.log("info", `Failed to delete the unit with id: ${id}`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED,
      });
    }

    ctx.logger.log("info", `success delete unit with id ${id}`);

    return res.status(200).json({
      status: res.statusCode,
      data: deletedUnit,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
});
