import { Service } from "typedi";
import { Post, PostCreateResponse } from "../models";
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
      let [result, fields] = await executeQuery<Post[], Post>(
        "Call spPostCreate",
        data
      );
      return result[0];
    } catch (e) {
      throw e;
    }
  };
}
