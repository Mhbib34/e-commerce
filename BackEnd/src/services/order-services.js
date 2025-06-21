import { prismaClient } from "../config/database.js";
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
  const orders = await prismaClient.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders || orders.length === 0) {
    throw new ResponseError(404, "No orders found.");
  }

  return orders;
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

  return orderItems;
};

export const getPaginatedOrders = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    prismaClient.order.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),
    prismaClient.order.count(),
  ]);
  return {
    data: orders,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateOrderStatus = async (orderId, status) => {
  const findOrder = await prismaClient.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!findOrder) throw new ResponseError(404, "Order is not found!");

  if (!orderId) throw new ResponseError(400, "Order ID is required");

  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  return order;
};
