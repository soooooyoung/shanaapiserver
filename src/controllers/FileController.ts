import JSZip from "jszip";
import * as multer from "multer";
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
  UploadedFile,
  UploadOptions,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { FileService } from "../services/FileService";
import { AuthTokenJWT, FileData } from "../models";
import { logError } from "../utils/Logger";
@Service()
@JsonController("/file")
export class FileController extends BaseController {
  @Inject()
  private fileService: FileService = new FileService();
  /**
   * Get Files
   */
  //   @HttpCode(200)
  //   @Get("/")
  //   public async getFiles(
  //     @HeaderParam("apikey") apikey: string,
  //     @Res() res: Response
  //   ) {
  //     try {
  //       if (false == (await this.checkAuth(apikey))) {
  //         return res.status(401).json({
  //           success: false,
  //           error: "Unauthorized",
  //         });
  //       }

  //       const result = await this.fileService.selectFiles();
  //       return res.status(200).json({
  //         success: true,
  //         result,
  //       });
  //     } catch (e) {
  //       logError(e);
  //       return res.status(400).json({
  //         success: false,
  //         error: e,
  //       });
  //     }
  //   }

  @HttpCode(200)
  @Post("/")
  public async createFile(
    @Res() res: Response,
    @HeaderParam("apikey") apikey: string,
    @CookieParam("token") authToken: string,
    @UploadedFile("file") file: Express.Multer.File
  ) {
    try {
      console.log("YUES");
      if (
        (await this.checkAuth(apikey)) &&
        (await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken))
      ) {
        const zip = new JSZip();
        const content = await zip.loadAsync(file.buffer);
        console.log("DATA", file);
        if (!content.files["data"]) {
          throw new Error("data file not found in the zip");
        }

        const dataFile = await content.files["data"].async("string");
        const EncodedData = Buffer.from(dataFile, "base64").toString("utf-8");
        console.log("EncodedData", EncodedData);
        const fileObj: FileData = { EncodedData, UserID: 1 };
        const result = await this.fileService.insertFile(fileObj);
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
