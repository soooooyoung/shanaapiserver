import { RowDataPacket } from "mysql2";
export interface Post {
  UserID?: number;
  PostID?: number;
  PostType?: number;
  Title?: string;
  TitleImage?: string;
  Content?: string;
  CreatedDate?: string;
  UpdatedDate?: string;
}

export interface PostResponse extends Post, RowDataPacket {}
