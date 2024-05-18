import { IsNotEmpty } from "class-validator";

export class LoginParam {
  @IsNotEmpty()
  public AuthToken?: string;
}
