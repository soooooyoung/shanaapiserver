import { Service } from "typedi";
import {
  UserCreateParam,
  User,
  UserResponse,
  ValidationException,
} from "../models";
import { executeQuery } from "../utils/database/QueryUtil";
import { EncryptionUtils } from "../utils/security/EncryptionUtils";

@Service()
export class AccountService {
  private encryptionUtil: EncryptionUtils = new EncryptionUtils();
  public selectAllUsers = async () => {
    try {
      let [result, fields] = await executeQuery<UserResponse[]>("spUserList");

      return result[0];
    } catch (e) {
      throw e;
    }
  };

  public insertUser = async ({
    Username,
    Password,
    ReferrerCode,
  }: UserCreateParam) => {
    try {
      if (undefined == Password) {
        throw new ValidationException("Password Is Empty");
      }

      const EncryptedPassword = this.encryptionUtil.encrypt(Password);

      let [result, fields] = await executeQuery<
        UserResponse[],
        UserCreateParam
      >("spUserCreate", {
        Username,
        Password: EncryptedPassword,
        ReferrerCode,
      });

      return result[0][0];
    } catch (e) {
      throw e;
    }
  };

  public verifyUser = async ({ Username, Password }: User) => {
    try {
      let [result, fields] = await executeQuery<UserResponse[], User>(
        "spUserVerify",
        {
          Username,
          Password,
        }
      );

      return result[0][0];
    } catch (e) {
      throw e;
    }
  };
}
