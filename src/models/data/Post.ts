import { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
  PostID?: number;
  UserID?: number;
  Title?: string;
  TitleImage?: string;
  Content?: string;
  CreatedDate?: string;
  UpdatedDate?: string;
}

export interface PostCreateResponse extends RowDataPacket {
  PostID: number;
}
export interface PostUpdateResponse extends RowDataPacket {
  PostID: number;
}
