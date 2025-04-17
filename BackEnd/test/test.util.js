import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeAllTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      email: "test@gmail.com",
    },
  });
};

export const removeAllTestCategory = async () => {
  await prismaClient.category.deleteMany({
    where: {
      name: "test category",
    },
  });
};

export const createTestCategory = async () => {
  await prismaClient.category.create({
    data: {
      name: "test category",
    },
  });
};
