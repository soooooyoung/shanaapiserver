import { Response } from "express";
import { Inject, Service } from "typedi";
import {
  JsonController,
  HttpCode,
  Get,
  Res,
  HeaderParams,
} from "routing-controllers";

import { BaseController } from "./BaseController";
import { BaseHeaderParam, Post as PostData } from "../models";
import { PostService } from "../services/PostService";

@Service()
@JsonController("/post")
export class PostController extends BaseController {
  @Inject()
  private postService: PostService = new PostService();
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

      let result = await this.postService.fetchAllPosts();
      return res.status(200).json({
        success: true,
        result,
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
