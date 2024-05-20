import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { RowDataPacket } from "mysql2";

export interface PostResponse extends Post, RowDataPacket {}

export class Post {
  @IsNotEmpty()
  public UserID?: number;

  public PostID?: number;

  @MaxLength(1)
  public PostType?: number;

  @IsString()
  public Title?: string;

  @IsString()
  public TitleImage?: string;

  @IsString()
  public Content?: string;

  @IsDateString()
  public CreatedDate?: string;

  @IsDateString()
  public UpdatedDate?: string;
}
export class PostCreateParam extends Post {
  @IsNotEmpty()
  @IsString()
  public Title?: string;

  @IsNotEmpty()
  @IsString()
  public Content?: string;
}

export class PostDeleteParam extends Post {
  @IsNotEmpty()
  public PostID?: number;
}
export class PostUpdateParam extends Post {
  @IsNotEmpty()
  public PostID?: number;
}
