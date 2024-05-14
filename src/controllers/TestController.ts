import { Response } from "express";
import { JsonController, HttpCode, Res, Get } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./BaseController";

@Service()
@JsonController("/test")
export class TestController extends BaseController {
  /**
   * Test
   */
  @HttpCode(200)
  @Get("/")
  public async ping(@Res() res: Response) {
    try {
      return res.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }
}
