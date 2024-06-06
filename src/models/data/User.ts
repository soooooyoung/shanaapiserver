import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RowDataPacket } from "mysql2/promise";
export interface User {
  userId?: number;
  username?: string;
  referrerCode?: string;
}

export interface UserResponse extends RowDataPacket {
  success?: boolean;
}

export class UserCreateParam {
  @IsNotEmpty()
  @IsString()
  public username?: string;

  @IsNotEmpty()
  @IsString()
  public password?: string;

  @IsNotEmpty()
  @IsString()
  public referrerCode?: string;
}
