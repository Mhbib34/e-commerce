import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

export const create = async (userId, items) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (total === 0) throw new ResponseError(400, "You not have a product!");
  const order = await prismaClient.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
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

  return order;
};
