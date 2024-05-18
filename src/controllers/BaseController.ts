import { JsonController } from "routing-controllers";
import { Service } from "typedi";
import { APIKeyUtils } from "../utils/security/APIKeyUtils";
import { BaseHeaderParam } from "../models";
import { env } from "../configs/env";

@Service()
@JsonController()
export class BaseController {
  protected apiKeyUtils: APIKeyUtils = new APIKeyUtils();

  protected checkAuth = async (
    getKey: (keyName: keyof BaseHeaderParam) => string
  ) => {
    const key = this.apiKeyUtils.parseFromKey(getKey("apikey"));
    return key == env.app.serviceID;
  };
}
