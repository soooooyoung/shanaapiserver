import { Service } from "typedi";
import { Post, PostCreateResponse, PostUpdateResponse } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";

@Service()
export class PostService {
  public selectAllPosts = async () => {
    try {
      let [result, fields] = await executeQuery<Post[]>("Call spPostList");
      return result;
    } catch (e) {
      throw e;
    }
  };

  public insertPost = async (data: Post) => {
    try {
      let [result, fields] = await executeQuery<PostCreateResponse[], Post>(
        "Call spPostCreate",
        data
      );
      return result[0];
    } catch (e) {
      throw e;
    }
  };

  public updatePost = async (data: Post) => {
    try {
      let [result, fields] = await executeQuery<PostUpdateResponse[], Post>(
        "Call spPostUpdate",
        data
      );
      return result[0];
    } catch (e) {
      throw e;
    }
  };

  public deletePost = async (postID: number) => {
    try {
      let [result, fields] = await executeQuery<
        PostUpdateResponse[],
        { postID: number }
      >("Call spPostDelete", { postID });
      return result[0];
    } catch (e) {
      throw e;
    }
  };
}
