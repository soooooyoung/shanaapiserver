import { JsonController } from "routing-controllers";
import { Service } from "typedi";
import { APIKeyUtils } from "../utils/security/APIKeyUtils";
import { AuthTokenJWT } from "../models";
import { env } from "../configs/env";
import { TokenUtils } from "../utils/security/JWTTokenUtils";

@Service()
@JsonController()
export class BaseController {
  protected apiKeyUtils: APIKeyUtils = new APIKeyUtils();
  protected tokenUtils: TokenUtils = new TokenUtils();

  protected checkAuth = async (apikey?: string) => {
    if (apikey === undefined) return false;
    const key = this.apiKeyUtils.parseFromKey(apikey);
    return key == env.app.serviceID;
  };

  protected verifyToken = async (authToken: string, userID: number) => {
    if (authToken === undefined) return false;

    const payload = await this.tokenUtils.verifyToken<AuthTokenJWT>(authToken);

    return payload && payload.user && payload.user.userId == userID;
  };
}
