import { Service } from "typedi";
import { UserCreateParam, User, UserResponse } from "../models";
import { executeQuery } from "../utils/database/QueryUtil";

@Service()
export class AccountService {
  public selectAllUsers = async () => {
    try {
      let [result, fields] = await executeQuery<UserResponse[]>("spUserList");

      return result[0];
    } catch (e) {
      throw e;
    }
  };

  public insertUser = async ({ userId, username, referrerCode }: User) => {
    try {
      let [result, fields] = await executeQuery<UserResponse[], User>(
        "spUserCreate",
        {
          userId,
          username,
          referrerCode,
        }
      );
      return result[0];
    } catch (e) {
      throw e;
    }
  };
}
