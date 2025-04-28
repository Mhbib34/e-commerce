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
