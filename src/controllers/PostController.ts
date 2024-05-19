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
  Put,
  Delete,
  CookieParam,
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
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam
  ) {
    try {
      if (false == (await this.checkAuth((key) => header[key]))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

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
  public async createPost(
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam,
    @CookieParam("token") authToken: string,
    @Body() data: PostData
  ) {
    try {
      if (
        data.UserID &&
        (await this.checkAuth((key) => header[key])) &&
        (await this.verifyToken(authToken, data.UserID))
      ) {
        const result = await this.postService.insertPost(data);
        return res.status(200).json({
          success: true,
          result,
        });
      }

      return res.status(401).json({
        success: false,
        error: "Unauthorized",
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
  @Put("/")
  public async updatePost(
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam,
    @CookieParam("token") authToken: string,
    @Body() data: PostData
  ) {
    try {
      if (
        data.UserID &&
        data.PostID &&
        (await this.checkAuth((key) => header[key])) &&
        (await this.verifyToken(authToken, data.UserID))
      ) {
        const result = await this.postService.updatePost(data);
        return res.status(200).json({
          success: true,
          result,
        });
      }

      return res.status(401).json({
        success: false,
        error: "Unauthorized",
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
  @Delete("/")
  public async deletePost(
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam,
    @CookieParam("token") authToken: string,
    @Body() data: PostData
  ) {
    try {
      if (
        data.UserID &&
        data.PostID &&
        (await this.checkAuth((key) => header[key])) &&
        (await this.verifyToken(authToken, data.UserID))
      ) {
        const result = await this.postService.deletePost(data.PostID);
        return res.status(200).json({
          success: true,
          result,
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
