import { Service } from "typedi";
import { Post, PostResponse, CategoryResponse } from "../models";
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

  public selectAllCategories = async () => {
    try {
      let [result, fields] = await executeQuery<CategoryResponse[]>(
        "spCategoryList"
      );

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
          PostTime: data.PostTime || "",
          Title: data.Title,
          TitleImage: data.TitleImage || "",
          Content: data.Content,
          Published: data.Published,
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

  public deletePost = async (PostID: number) => {
    try {
      let [result, fields] = await executeQuery<PostResponse[], Post>(
        "spPostDelete",
        {
          PostID,
        }
      );
      return result[0][0];
    } catch (e) {
      throw e;
    }
  };
}
