import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeAllTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};

export const removeAllTestUserCartEmpty = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "testempty@gmail.com",
    },
  });
};

export const removeAllTestUserOrder = async (userId) => {
  await prismaClient.cartItem.deleteMany({
    where: {
      userId: userId,
    },
  });
  await prismaClient.orderItem.deleteMany({
    where: {
      order: {
        userId: userId,
      },
    },
  });

  await prismaClient.order.deleteMany({
    where: {
      userId: userId,
    },
  });

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
  const existing = await prismaClient.category.findUnique({
    where: { name: "test category" },
  });

  if (existing) return existing;

  return prismaClient.category.create({
    data: {
      name: "test category",
    },
  });
};

export const createTestProduct = async () => {
  const category = await createTestCategory();

  return await prismaClient.product.create({
    data: {
      name: "test product",
      description: "test desc",
      price: 100,
      stock: 10,
      categoryId: category.id,
    },
  });
};
