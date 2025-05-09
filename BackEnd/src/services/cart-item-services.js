import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

export const addToCart = async (userId, productId, quantity) => {
  const findProduct = await prismaClient.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!findProduct) throw new ResponseError(404, "Product is not found!");

  const existingCartItem = await prismaClient.cartItem.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (existingCartItem) {
    return prismaClient.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
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
  } else {
    return prismaClient.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
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
  }
};

export const getCartByUser = async (userId) => {
  const cartItems = prismaClient.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  if (!cartItems || (await cartItems).length === 0)
    throw new ResponseError(400, "Your cart still empty!");

  return cartItems;
};

export const removeCart = async (userId, cartItemId) => {
  const existingCart = await prismaClient.cartItem.findFirst({
    where: {
      id: cartItemId,
    },
  });

  if (!existingCart) throw new ResponseError(400, "Cart is not found");

  return prismaClient.cartItem.delete({
    where: {
      userId,
      id: cartItemId,
    },
  });
};
