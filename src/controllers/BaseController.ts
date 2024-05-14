import { JsonController } from "routing-controllers";
import { Service } from "typedi";
import { APIKeyUtils } from "../utils/security/APIKeyUtils";
import { BaseHeaderParam } from "models";

@Service()
@JsonController()
export class BaseController {
  protected apiKeyUtils: APIKeyUtils = new APIKeyUtils();

  protected checkAuth = async (
    getKey: (keyName: keyof BaseHeaderParam) => string
  ) => {
    const key = this.apiKeyUtils.parseFromKey(getKey("apikey"));
    // TODO: apikey verification

    return true;
  };
}
