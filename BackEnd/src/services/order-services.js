import { prismaClient } from "../config/database.js";
import { ResponseError } from "../error/response-error.js";

export const create = async (userId) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (!cartItems || cartItems.length === 0) {
      throw new ResponseError(400, "Cart is empty");
    }

    // Check stock availability first
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw new ResponseError(
          400,
          `Not enough stock for product: ${item.product.name}`
        );
      }
    }

    let total = 0;
    const orderItemsData = cartItems.map((item) => {
      const tax = item.product.price * 0.05 * item.quantity;
      const shipping = 25000;
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal + tax + shipping;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create order
    const order = await tx.order.create({
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

    // Update stock
    for (const item of cartItems) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { userId },
    });

    return order;
  });
};

export const getOrderByUser = async (userId) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      user: {
        select: { id: true, name: true, email: true, username: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const getOrderById = async (orderId) => {
  const findOrder = await prismaClient.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
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
        select: { id: true, name: true, role: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getOrderByUserParams = async (userId) => {
  const orders = await prismaClient.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders || orders.length === 0) {
    throw new ResponseError(404, "No orders found for this user");
  }

  return orders;
};

export const getPaginatedOrders = async (page = 1, limit = 10) => {
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
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
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
  if (!orderId) throw new ResponseError(400, "Order ID is required");
  if (!status) throw new ResponseError(400, "Status is required");

  const findOrder = await prismaClient.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!findOrder) throw new ResponseError(404, "Order is not found!");

  const order = await prismaClient.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
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

  return order;
};

export const createOrderByCartId = async (userId, cartItemId) => {
  return await prismaClient.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: {
        userId,
        id: cartItemId,
      },
      include: {
        product: true,
      },
    });

    if (!cartItem || cartItem.userId !== userId) {
      throw new ResponseError(400, "Cart item not found or unauthorized");
    }

    if (cartItem.product.stock < cartItem.quantity) {
      throw new ResponseError(
        400,
        `Not enough stock for product: ${cartItem.product.name}`
      );
    }

    const total = cartItem.product.price * cartItem.quantity;

    const order = await tx.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: [
            {
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              price: cartItem.product.price,
            },
          ],
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

    await tx.product.update({
      where: {
        id: cartItem.productId,
      },
      data: {
        stock: {
          decrement: cartItem.quantity,
        },
      },
    });

    await tx.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return order;
  });
};

export const cancelOrder = async (orderId, userId) => {
  return await prismaClient.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new ResponseError(404, "Order not found!");
    }

    if (order.userId !== userId) {
      throw new ResponseError(403, "You can only cancel your own orders!");
    }

    if (order.status === "CANCELLED") {
      throw new ResponseError(400, "Order is already cancelled!");
    }

    if (order.status === "DELIVERED") {
      throw new ResponseError(400, "Cannot cancel delivered order!");
    }

    // Restore stock
    for (const item of order.orderItems) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    // Update order status
    const updatedOrder = await tx.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
        updatedAt: new Date(),
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

    return updatedOrder;
  });
};

export const getOrderStats = async () => {
  const [totalOrders, totalRevenue, ordersByStatus] = await Promise.all([
    prismaClient.order.count(),
    prismaClient.order.aggregate({
      _sum: {
        total: true,
      },
    }),
    prismaClient.order.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    ordersByStatus: ordersByStatus.map((status) => ({
      status: status.status,
      count: status._count._all,
    })),
  };
};
