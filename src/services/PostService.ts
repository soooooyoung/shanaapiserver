import { Service } from "typedi";
import { Post } from "../models";
import { query } from "../utils/database/QueryUtil";

@Service()
export class PostService {
  public fetchAllPosts = async () => {
    try {
      let result: Post[] = await query<Post[]>("Call spPostList()");
      return result;
    } catch (e) {
      throw e;
    }
  };
}
