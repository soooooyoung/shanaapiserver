import { Service } from "typedi";
import { Post, PostResponse } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";

@Service()
export class PostService {
  public selectAllPosts = async () => {
    try {
      let [result, fields] = await executeQuery<PostResponse[]>("spPostList");

      return result[0];
    } catch (e) {
      throw e;
    }
  };

  public insertPost = async (data: Post) => {
    try {
      let [result, fields] = await executeQuery<PostResponse[], Post>(
        "spPostCreate",
        {
          PostType: data.PostType || 0,
          UserID: data.UserID,
          PostDate: data.PostDate || "",
          Title: data.Title,
          TitleImage: data.TitleImage || "",
          Content: data.Content,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };

  public updatePost = async (data: Post) => {
    try {
      let [result, fields] = await executeQuery<PostResponse[], Post>(
        "spPostUpdate",
        {
          PostID: data.PostID,
          PostType: data.PostType || 0,
          Title: data.Title,
          TitleImage: data.TitleImage || "",
          Content: data.Content,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };

  public deletePost = async (postID: number) => {
    try {
      let [result, fields] = await executeQuery<PostResponse[], Post>(
        "spPostDelete",
        {
          PostID: postID,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };
}
