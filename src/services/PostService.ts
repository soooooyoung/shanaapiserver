import { Service } from "typedi";
import { IProcedureResult } from "mssql";
import { DBConnectionPool } from "../utils/database/DBConnector";
import { Post } from "../models";

@Service()
export class PostService {
  public fetchAllPosts = async () => {
    try {
      let result: IProcedureResult<Post[]> = await DBConnectionPool()
        .request()
        .execute("spPostList");
      return result.recordset;
    } catch (e) {
      throw e;
    }
  };
}
