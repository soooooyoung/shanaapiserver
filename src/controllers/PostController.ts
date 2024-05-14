import { Response } from "express";
import { Service } from "typedi";
import {
  JsonController,
  HttpCode,
  Get,
  Res,
  HeaderParams,
} from "routing-controllers";

import { BaseController } from "./BaseController";
import { BaseHeaderParam, Post as PostData } from "../models";

@Service()
@JsonController("/post")
export class PostController extends BaseController {
  /**
   * Get All Posts
   */
  @HttpCode(200)
  @Get("/")
  public async getAllPosts(
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam
    // TODO: @CookieParam("token") authToken: string
  ) {
    try {
      const auth = await this.checkAuth((key) => header[key]);
      if (false == auth) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }
}
