import * as jwt from "jsonwebtoken";
import { env } from "../../configs/env";
import { JWTPayload, User } from "../../models/";
import {
  IllegalStateException,
  InvalidKeyException,
  NoResultException,
} from "../../models/";

export class TokenUtils {
  private SECRETKEY = env.utils.JWT_TOKEN_SECRET || "";

  private doGenerateToken = async (
    payload: string | object,
    secret?: string,
    expiresIn?: string | number
  ) => {
    try {
      if (!secret) {
        throw new NoResultException();
      }
      if (expiresIn) return jwt.sign(payload, secret, { expiresIn });
      return jwt.sign(payload, secret);
    } catch (e) {
      console.log(e);
      throw new IllegalStateException("Unable to generate Token: " + e);
    }
  };

  public generateAuthToken = (user: User, expiresIn?: string | number) => {
    if (!user || !user.userId) {
      console.log("NO USER IN GENERATE AUTH TOKEN");
      throw new NoResultException();
    }
    return this.doGenerateToken({ user }, this.SECRETKEY, expiresIn);
  };

  public generateToken = (
    payload: string | object,
    expiresIn?: string | number
  ) => {
    if (!payload) {
      console.log("NO PAYLOAD IN GENERATE TOKEN");
      throw new NoResultException();
    }
    return this.doGenerateToken(payload, this.SECRETKEY, expiresIn);
  };

  /**
   * Define preassigned (upon key generation) payload data type for relevant data handling
   */
  public verifyToken = async <T extends JWTPayload>(token: string) => {
    try {
      return jwt.verify(token, this.SECRETKEY) as T;
    } catch (e) {
      console.log(e);
      throw new InvalidKeyException("Invalid Token");
    }
  };
}
