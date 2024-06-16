import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RowDataPacket } from "mysql2/promise";

export class FileData {
  @IsNumber()
  public UserID?: number;

  @IsNumber()
  public FileID?: number;

  @IsNotEmpty()
  @IsString()
  public EncodedData?: string;
}

export interface FileResponse extends FileData, RowDataPacket {}
