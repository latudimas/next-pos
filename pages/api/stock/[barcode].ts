import { createApiRoute } from "@libs/api";
import { RESPONSE_MESSAGE } from "@root/constants";

export default createApiRoute({
  //GET
  async get(req, res, ctx) {
    const { barcode } = req.query;
    const stockResult = await ctx.stockService.getStockByBarcode(barcode as string);

    if (stockResult == null) {
      ctx.logger.log("info", `code: 404 stock:${stockResult}`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      });
    }

    ctx.logger.log("info", `code: 200 stock:${stockResult}`);

    return res.status(200).json({
      status: res.statusCode,
      data: stockResult,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
  //PATCH
  async patch(req, res, ctx) {
    const { barcode } = req.query;
    const stockInput = req.body;
    const stockUpdated = await ctx.stockService.updateStock(barcode as string, stockInput);

    if (stockUpdated == null) {
      ctx.logger.log("info", `stock with barcode: ${barcode} Not found`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.NOT_FOUND,
      });
    }

    ctx.logger.log("info", `success update stock: ${stockUpdated}`);

    return res.status(200).json({
      status: res.statusCode,
      data: stockUpdated,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
  //DELETE
  async delete(req, res, ctx) {
    const { barcode } = req.query;
    const deletedStock = await ctx.stockService.deleteStock(
      barcode as string
    );

    if (deletedStock == null) {
      ctx.logger.log("info", `Failed to delete the stock with barcode: ${barcode}`);
      return res.status(404).json({
        status: res.statusCode,
        data: null,
        message: RESPONSE_MESSAGE.FAILED,
      });
    }

    ctx.logger.log("info", `success delete stock with barcode ${barcode}`);

    return res.status(200).json({
      status: res.statusCode,
      data: deletedStock,
      message: RESPONSE_MESSAGE.SUCCESS,
    });
  },
});
