import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RowDataPacket } from "mysql2/promise";
export class User {
  @IsNotEmpty()
  @IsString()
  public Username?: string;

  @IsNotEmpty()
  @IsString()
  public Password?: string;
}

export interface UserResponse extends RowDataPacket {}

export class UserCreateParam extends User {
  @IsNotEmpty()
  @IsString()
  public ReferrerCode?: string;
}
