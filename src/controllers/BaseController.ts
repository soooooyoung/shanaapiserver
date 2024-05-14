import { JsonController } from "routing-controllers";
import { Service } from "typedi";
import { APIKeyUtils } from "../utils/security/APIKeyUtils";

@Service()
@JsonController()
export class BaseController {
  protected apiKeyUtils: APIKeyUtils = new APIKeyUtils();

  protected checkAuth = async (getKey: (keyName: string) => string) => {
    const key = this.apiKeyUtils.parseFromKey(getKey("apikey"));

    return false;
  };
}
