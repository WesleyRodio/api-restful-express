import { ValidationError } from "../../shared/error/erros.js";

class UserController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  list() {
    throw new ValidationError("Invalid query parameter", [
      { field: "age", message: "Age must be a positive integer" },
    ]);
    // const users = [
    //   { id: 1, name: "John Doe" },
    //   { id: 2, name: "Jane Smith" },
    // ];
    // res.status(200).json(users);
  }
}

export default new UserController();
