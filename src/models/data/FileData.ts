import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RowDataPacket } from "mysql2/promise";

export class FileData {
  @IsNotEmpty()
  @IsNumber()
  public UserID?: number;

  @IsNumber()
  public FileID?: number;

  @IsNotEmpty()
  public Data?: any;
}

export interface FileResponse extends FileData, RowDataPacket {}
