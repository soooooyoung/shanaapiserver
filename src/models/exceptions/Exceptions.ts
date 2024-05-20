export class BaseException extends Error {
  status?: number;

  public getMessage() {
    return this.message;
  }

  public getErrorCode() {
    return this.getErrorCode;
  }

  constructor(message?: string, status?: number) {
    super();
    if (message) this.message = message;
    if (status) this.status = status;
  }
}

export class IllegalStateException extends BaseException {}
export class InvalidKeyException extends BaseException {}
export class ValidationException extends BaseException {}
export class NoResultException extends BaseException {
  constructor() {
    super("No Result");
  }
}
