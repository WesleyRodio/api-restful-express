import bcrypt from "bcrypt";

import { CreateInvalidUser } from "../../shared/error/user/index.js";
import { UserResponseSchema, UsersResponseSchema } from "../schemas/users.js";

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

  async update({ id, name, email, password, role, avatar }) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updateUser = await UsersRepository.update({
      id,
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        avatar,
      },
    });

    return UserResponseSchema.parse(updateUser);
  }

  async list() {
    const users = await UsersRepository.findUsers();

    return UsersResponseSchema.parse(users);
    // return users;
  }
}

export default new UserService();
