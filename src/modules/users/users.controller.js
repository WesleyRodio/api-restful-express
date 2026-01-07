import responses from "../../helpers/responses.js";
import { NotFoundError, ValidationError } from "../../shared/error/index.js";
import { UserSchema, UserUpdateSchema } from "../schemas/users.js";

import UsersService from "./users.service.js";

class UsersController {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async create(req, res) {
    // const { name, email, password } = req.body;
    const data = UserSchema.safeParse(req.body);

    if (!data.success) {
      throw new ValidationError(
        responses.invalidData(),
        data.error.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      );
    }

    const { name, email, password } = data.data;

    const user = await UsersService.create({ name, email, password });

    return res.create({
      resource: "User",
      user,
    });
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async update(req, res) {
    const data = UserUpdateSchema.safeParse(req.body);

    if (!data.success) {
      throw new ValidationError(
        responses.invalidData(),
        data.error.issues.map(issue => ({
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      );
    }

    const { id, avatar, email, name, password, role } = data.data;

    const user = await UsersService.update({
      id,
      data: {
        avatar,
        email,
        name,
        password,
        role,
      },
    });

    res.success(user);
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async list(req, res) {
    const users = await UsersService.list();

    return res.success(users);
  }

  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async getById(req, res) {
    const id = req.params.id;

    const user = await UsersService.getById(id);

    if (!user) {
      throw new NotFoundError(`User ${id}`);
    }

    return res.success(user);
  }
}

export default new UsersController();
