import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

export const create = async (userId) => {
  const cartItems = await prismaClient.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (!cartItems || cartItems.length === 0) {
    throw new ResponseError(400, "Cart is empty");
  }

  let total = 0;
  const orderItemsData = cartItems.map((item) => {
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    };
  });

  const order = await prismaClient.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, name: true },
          },
        },
      },
      user: {
        select: { id: true, name: true },
      },
    },
  });

  await prismaClient.cartItem.deleteMany({
    where: { userId },
  });

  return order;
};

export const getOrderByUser = async (userId) => {
  const orderItems = await prismaClient.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, name: true },
          },
        },
      },
      user: {
        select: { id: true, name: true },
      },
    },
  });

  if (!orderItems || orderItems.length === 0)
    throw new ResponseError(400, "Your order is empty!");

  return orderItems;
};

export const getOrderById = async (OrderId) => {
  const findOrder = await prismaClient.order.findUnique({
    where: {
      id: OrderId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!findOrder) throw new ResponseError(404, "Order is not found!");

  return findOrder;
};

export const getAllOrder = async () => {
  const findOrder = await prismaClient.order.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return findOrder;
};

export const getOrderByUserParams = async (userId) => {
  const findUser = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) throw new ResponseError(404, "User is not found");

  const orderItems = await prismaClient.order.findMany({
    where: {
      userId: findUser.id,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, name: true },
          },
        },
      },
      user: {
        select: { id: true, name: true },
      },
    },
  });

  if (!orderItems || orderItems.length === 0)
    throw new ResponseError(400, "Your order is empty!");

  return orderItems;
};
