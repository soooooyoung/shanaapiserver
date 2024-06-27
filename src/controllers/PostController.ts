import { Response } from "express";
import { Inject, Service } from "typedi";
import {
  JsonController,
  HttpCode,
  Get,
  Res,
  Post,
  Body,
  Put,
  Delete,
  CookieParam,
  HeaderParam,
  Param,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { PostService } from "../services/PostService";
import {
  AuthTokenJWT,
  Mail,
  PostCreateParam,
  PostDeleteParam,
  PostUpdateParam,
} from "../models";
import { logError } from "../utils/Logger";

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
    @HeaderParam("apikey") apikey: string,
    @Res() res: Response
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      const result = await this.postService.selectAllPosts();
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (e) {
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }

  /**
   * Get Categories
   */
  @HttpCode(200)
  @Get("/categories")
  public async getCategories(
    @HeaderParam("apikey") apikey: string,
    @Res() res: Response
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      const result = await this.postService.selectAllCategories();
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (e) {
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }

  /**
   * Get Posts
   */
  @HttpCode(200)
  @Post("/page")
  public async getPosts(
    @HeaderParam("apikey") apikey: string,
    @Body() { offset = 0, limit = 2 }: { offset?: number; limit?: number },
    @Res() res: Response
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      const result = await this.postService.selectPosts(offset, limit);
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (e) {
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }

  @HttpCode(200)
  @Post("/mail")
  public async createMail(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @Body() data: Mail
  ) {
    try {
      if (
        data.Email &&
        data.Content &&
        data.Name &&
        (await this.checkAuth(apikey))
      ) {
        const result = await this.postService.insertMail(data);
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
      logError(e);
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
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @Body() data: PostCreateParam
  ) {
    try {
      if (
        data.UserID &&
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
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
      logError(e);
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
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @Body() data: PostUpdateParam
  ) {
    try {
      if (
        data.UserID &&
        data.PostID &&
        (await this.checkAuth(apikey)) &&
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
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }

  @HttpCode(200)
  @Delete("/:id")
  public async deletePost(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @Param("id") postID: number
  ) {
    try {
      if (
        postID &&
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
      ) {
        const result = await this.postService.deletePost(postID);
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
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }
}
