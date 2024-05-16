import { Service } from "typedi";
import { DBConnectionPool } from "../utils/database/MYSQLConnector";
import { Post } from "../models";

@Service()
export class PostService {
  public fetchAllPosts = () => {
    try {
      let result: Post[];

      DBConnectionPool().query<Post[]>(
        "Call spPostList()",
        (queryErr, rows) => {
          if (queryErr != null) throw queryErr;
          result = rows;
        }
      );
    } catch (e) {
      throw e;
    }
  };
}
