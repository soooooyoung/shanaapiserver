import * as path from "path";

import {
  PathLike,
  access,
  mkdir,
  writeFile,
  readFile,
  open,
  fchmod,
  constants,
} from "fs";
import { Response } from "express";
import { Inject, Service } from "typedi";
import {
  JsonController,
  HttpCode,
  Get,
  Res,
  Post,
  Body,
  Delete,
  CookieParam,
  HeaderParam,
  UploadedFile,
  Param,
  QueryParam,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { FileService } from "../services/FileService";
import { AuthTokenJWT } from "../models";
import { logError } from "../utils/Logger";
import { promisify } from "util";
import { env } from "../configs/env";
@Service()
@JsonController("/file")
export class FileController extends BaseController {
  @Inject()
  private fileService: FileService = new FileService();

  private writeFileAsync = promisify(writeFile);
  private readFileAsync = promisify(readFile);
  private mkdirAsync = promisify(mkdir);
  private accessAsync = promisify(access);
  private openAsync = promisify(open);
  private fchmodAsync = promisify(fchmod);

  private checkDirAccess = async (path: PathLike) => {
    try {
      await this.accessAsync(path);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Get Files
   */
  @HttpCode(200)
  @Get("/:id")
  public async getFile(
    @HeaderParam("apikey") apikey: string,
    @Param("id") fileID: number,
    @Res() res: Response
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      if (fileID) {
        const result = await this.fileService.getFile(fileID);
        return res.status(200).send(result.Data);
      }

      return res.status(401).json({
        success: false,
        error: "",
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
  public async createFile(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @UploadedFile("file") file: Express.Multer.File
  ) {
    try {
      if (
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
      ) {
        const fileBuffer = Buffer.from(file.buffer);
        const result = await this.fileService.insertFile(fileBuffer);
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

  /**
   * Get Music
   */

  @HttpCode(200)
  @Get("/music/list")
  public async getAllMusic(
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

      const result = await this.fileService.getFileListMusic();
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
  @Get("/music/:id")
  public async getFileMusic(
    @HeaderParam("apikey") apikey: string,
    @Param("id") fileID: number,
    @Res() res: Response
  ) {
    try {
      if (false == (await this.checkAuth(apikey))) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized",
        });
      }

      if (fileID) {
        const uploadPath = path.resolve(`${env.path.music}`, `${fileID}.mp3`);

        if (false == (await this.checkDirAccess(uploadPath))) {
          const fd = await this.openAsync(uploadPath, "r");
          await this.fchmodAsync(fd, 0o777);
        }

        const result = await this.readFileAsync(uploadPath);
        return res.status(200).send(result);
      }

      return res.status(401).json({
        success: false,
        error: "",
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
  @Post("/music")
  public async createFileMusic(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @UploadedFile("file") file: Express.Multer.File
  ) {
    try {
      if (
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
      ) {
        const fileBuffer = Buffer.from(file.buffer);
        const uploadPath = path.resolve(`${env.path.music}`);
        const result = await this.fileService.insertPath(
          file.originalname,
          uploadPath
        );

        if (!(await this.checkDirAccess(uploadPath))) {
          await this.mkdirAsync(uploadPath, { recursive: true });
        }

        await this.writeFileAsync(
          path.resolve(uploadPath, `${result.FileID}.mp3`),
          fileBuffer
        );

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

  /**
   * Delete File
   */
  @HttpCode(200)
  @Delete("/")
  public async deleteFile(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @Body() data: { FileID: number }
  ) {
    try {
      if (
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
      ) {
        const result = await this.fileService.deleteFile(data.FileID);
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
