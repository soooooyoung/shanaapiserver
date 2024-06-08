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
      if (undefined == Password || undefined == Username) {
        throw new ValidationException("Required Field Is Empty");
      }
      const [result, fields] = await executeQuery<
        UserResponse,
        { Username?: string }
      >("SpUserPassword", {
        Username,
      });
      const encrypted = result[0][0].EncryptedPassword;
      if (this.encryptionUtil.decrypt(encrypted) == Password) return true;
      return false;
    } catch (e) {
      throw e;
    }
  };
}
