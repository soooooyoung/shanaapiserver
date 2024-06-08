import { IsNotEmpty, IsString } from "class-validator";

export class LoginParam {
  @IsString()
  public AuthToken?: string;

  @IsString()
  public Username?: string;

  @IsString()
  public Password?: string;
}
