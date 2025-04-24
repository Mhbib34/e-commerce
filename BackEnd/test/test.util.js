import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeAllTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};
export const removeAllTestIsUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "testuser@gmail.com",
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
export const removeAllTestProduct = async () => {
  await prismaClient.product.deleteMany({
    where: {
      name: "test product",
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

export const createTestProduct = async () => {
  const category = await prismaClient.category.findFirst({
    where: { name: "test category" },
  });

  if (!category) throw new Error("Category not found");

  await prismaClient.product.create({
    data: {
      name: "test product",
      description: "test product",
      price: 100,
      stock: 100,
      category: {
        connect: { id: category.id },
      },
    },
  });
};
