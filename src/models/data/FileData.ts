import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RowDataPacket } from "mysql2/promise";

export class FileData {
  @IsNotEmpty()
  @IsNumber()
  public UserID?: number;

  @IsNumber()
  public FileID?: number;

  public Data?: any;

  @IsString()
  public FileName?: string;

  @IsString()
  public Path?: string;
}

export interface FileResponse extends FileData, RowDataPacket {}
