import { User } from "../../models";

export interface JWTPayload {
  iat?: number;
  exp?: number;
}

export interface AuthTokenJWT extends JWTPayload {
  userID: number;
}
