import { IsNotEmpty } from "class-validator";

export class BaseHeaderParam {
  @IsNotEmpty()
  public "apikey": string;
}
