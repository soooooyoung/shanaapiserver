import { Response } from "express";
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
import { BaseHeaderParam, LoginParam, AuthTokenJWT } from "../models";
import { TokenUtils } from "../utils/security/JWTTokenUtils";
import { Service } from "typedi";
import { env } from "../configs/env";

@Service()
@JsonController("/signin")
export class SigninController extends BaseController {
  private tokenUtil: TokenUtils = new TokenUtils();
  /**
   * Sign In
   */
  @HttpCode(200)
  @Post("/")
  public async getAllPosts(
    @Res() res: Response,
    @HeaderParams() header: BaseHeaderParam,
    @Body() { AuthToken }: LoginParam
  ) {
    try {
      if (await this.checkAuth((key) => header[key])) {
        if (AuthToken) {
          const payLoad = await this.tokenUtil.verifyToken<AuthTokenJWT>(
            AuthToken
          );

          res.cookie("token", AuthToken, {
            secure: env.isProduction,
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });

          return res.status(200).json({
            success: true,
            result: payLoad.user,
          });
        }
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
}
