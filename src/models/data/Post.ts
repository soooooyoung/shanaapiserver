import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { RowDataPacket } from "mysql2/promise";

export interface PostResponse extends Post, RowDataPacket {}

export class Post {
  @IsNotEmpty()
  public UserID?: number;

  @IsNumber()
  public PostID?: number;

  @MaxLength(1)
  public PostType?: number;

  @IsNotEmpty()
  @IsString()
  public Title?: string;

  @IsString()
  public TitleImage?: string;

  @IsNotEmpty()
  @IsString()
  public Content?: string;

  @IsDateString()
  public PostDate?: string;

  @IsDateString()
  public CreatedDate?: string;

  @IsDateString()
  public UpdatedDate?: string;
}
export class PostCreateParam extends Post {}

export class PostDeleteParam extends Post {
  @IsNotEmpty()
  public PostID?: number;
}
export class PostUpdateParam extends Post {
  @IsNotEmpty()
  public PostID?: number;
}
