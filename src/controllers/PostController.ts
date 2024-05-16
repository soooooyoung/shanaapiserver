import { Response } from "express";
import { Inject, Service } from "typedi";
import { JsonController, HttpCode, Get, Res } from "routing-controllers";
import { BaseController } from "./BaseController";
import { PostService } from "../services/PostService";
import { DBConnectionPool } from "../utils/database/MYSQLConnector";
import { Post } from "../models";

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

      DBConnectionPool().query<Post[]>(
        "Call spPostList()",
        (queryErr, rows) => {
          if (queryErr != null) throw queryErr;

          return res.status(200).json({
            success: true,
            result: rows,
          });
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }
}
