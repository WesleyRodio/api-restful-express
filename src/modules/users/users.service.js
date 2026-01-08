import bcrypt from "bcrypt";

import {
  CreateInvalidUser,
  UserNotFoundError,
} from "../../shared/error/user/index.js";
import {
  UserResponseSchema,
  UsersResponseSchema,
  UserUpdateSchema,
} from "../schemas/users.js";

import UsersRepository from "./users.repository.js";

class UserService {
  async getById(id) {
    const user = await UsersRepository.findById(id);
    return UserResponseSchema.parse(user);
  }

  async create({ name, email, password }) {
    const existingUser = await UsersRepository.findByEmail(email);

    if (existingUser) {
      throw new CreateInvalidUser(name, email);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return UserResponseSchema.parse(newUser);
  }

  async update({ id, data }) {
    const values = UserUpdateSchema.parse(data);

    if (values.password) {
      values.password = await bcrypt.hash(values.password, 10);
    }

    const existingUser = await UsersRepository.findById(id);

    if (!existingUser) {
      throw new UserNotFoundError(id, values);
    }

    const updateUser = await UsersRepository.update({
      id,
      data: values,
    });

    return UserResponseSchema.parse(updateUser);
  }

  async list() {
    const users = await UsersRepository.findUsers();

    return UsersResponseSchema.parse(users);
  }
}

export default new UserService();
