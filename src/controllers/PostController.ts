import { Response } from "express";
import { Inject, Service } from "typedi";
import {
  JsonController,
  HttpCode,
  Get,
  Res,
  HeaderParams,
  Post,
  Body,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { PostService } from "../services/PostService";
import { BaseHeaderParam, Post as PostData } from "../models";

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
    @Res() res: Response
    // @HeaderParams() header: BaseHeaderParam
    // TODO: @CookieParam("token") authToken: string
  ) {
    try {
      // const auth = await this.checkAuth((key) => header[key]);
      // if (false == auth) {
      //   return res.status(401).json({
      //     success: false,
      //     error: "Unauthorized",
      //   });
      // }
      const result: PostData[] = await this.postService.selectAllPosts();

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

  @HttpCode(200)
  @Post("/")
  public async createPost(@Res() res: Response, @Body() data: PostData) {
    try {
      const result = await this.postService.insertPost(data);

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
