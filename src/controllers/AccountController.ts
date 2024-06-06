import { Response } from "express";
import {
  JsonController,
  HttpCode,
  Res,
  Post,
  Body,
  HeaderParam,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { LoginParam, AuthTokenJWT } from "../models";
import { TokenUtils } from "../utils/security/JWTTokenUtils";
import { Service } from "typedi";
import { env } from "../configs/env";
import { logError } from "../utils/Logger";
import { UserCreateParam } from "../models/data/User";
import { AccountService } from "../services/AccountService";

@Service()
@JsonController("")
export class AccountController extends BaseController {
  private tokenUtil: TokenUtils = new TokenUtils();
  private accountService: AccountService = new AccountService();
  /**
   * Sign In
   */
  @HttpCode(200)
  @Post("/signin")
  public async signIn(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @Body() { AuthToken }: LoginParam
  ) {
    try {
      if (await this.checkAuth(apikey)) {
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
      logError(e);
      return res.status(400).json({
        success: false,
        error: e,
      });
    }
  }

  /**
   * Sign Up
   */
  @HttpCode(200)
  @Post("/signup")
  public async signUp(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @Body() data: UserCreateParam
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      const result = await this.accountService.insertUser(data);
      return res.status(result?.success ? 200 : 401).json({
        success: result?.success,
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