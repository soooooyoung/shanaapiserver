import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { RowDataPacket } from "mysql2/promise";

export interface PostResponse extends Post, RowDataPacket {}
export interface CategoryResponse extends RowDataPacket {
  Name?: string;
  CategoryID?: number;
}
export class Post {
  @IsNotEmpty()
  public UserID?: number;

  @IsNumber()
  public PostID?: number;

  @IsNumber()
  public CategoryID?: number;

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
  public PostTime?: string;

  @IsDateString()
  public CreatedTime?: string;

  @IsDateString()
  public UpdatedTime?: string;

  @IsBoolean()
  public Published?: boolean;
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

export class Mail {
  @IsNotEmpty()
  @IsString()
  public Name?: string;
  @IsNotEmpty()
  @IsString()
  public Email?: string;
  @IsNotEmpty()
  @IsString()
  public Content?: string;
}
