import { loadAsync } from "jszip";
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
  Param,
} from "routing-controllers";
import { BaseController } from "./BaseController";
import { FileService } from "../services/FileService";
import { AuthTokenJWT, FileData } from "../models";
import { logError } from "../utils/Logger";
import { InputType, file, generateAsync } from "jszip";
@Service()
@JsonController("/file")
export class FileController extends BaseController {
  @Inject()
  private fileService: FileService = new FileService();

  private async compressBase64Data(data: string): Promise<ArrayBuffer> {
    file<InputType>("data.txt", data || "");
    const zipBlob = await generateAsync({ type: "arraybuffer" });
    return zipBlob;
  }

  private arrayBufferToBuffer = (arrayBuffer: ArrayBuffer): Buffer => {
    return Buffer.from(arrayBuffer);
  };

  private bufferToArrayBuffer = (buffer: Buffer): ArrayBuffer => {
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    );
  };

  /**
   * Get Files
   */
  @HttpCode(200)
  @Get("/:id")
  public async getFiles(
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
