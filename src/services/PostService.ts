import { Service } from "typedi";
import { Post, PostResponse, CategoryResponse, Mail } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";
import { fromZonedTime } from "date-fns-tz";

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
  public selectPosts = async (offset: number, limit: number) => {
    try {
      let [result, fields] = await executeQuery<
        PostResponse[],
        { offset: number; limit: number }
      >("spPostListPage", { offset, limit });

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
          CategoryID: data.UserID || 0,
          PostTime:
            data.PostTime ||
            fromZonedTime(Date.now(), "Asia/Seoul").toISOString(),
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

  public insertMail = async (data: Mail) => {
    try {
      let [result, fields] = await executeQuery<PostResponse[], Mail>(
        "spMailCreate",
        {
          Name: data.Name,
          Email: data.Email,
          Content: data.Content,
        }
      );
      return result;
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
