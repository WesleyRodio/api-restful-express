import { BusinessError } from "../index.js";

export class CreateInvalidUser extends BusinessError {
  /**
   * @param {String} name
   * @param {String} email
   */
  constructor(name, email) {
    super(
      "User already exists with name, and email",
      400,
      "USER_ALREADY_EXISTS",
      {
        details: { name, email },
      },
    );
  }
}

export class UserNotFoundError extends BusinessError {
  constructor(id, details = {}) {
    super(`User ${id} not found`, 404, "USER_NOT_FOUND", {
      id,
      ...details,
    });
  }
}
