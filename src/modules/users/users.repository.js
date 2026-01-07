import { prisma } from "../../config/database.js";

class UsersRepository {
  create(data) {
    return prisma.user.create({ data });
  }

  update({ id, data }) {
    return prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  findUsers() {
    return prisma.user.findMany();
  }

  findById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}

export default new UsersRepository();
