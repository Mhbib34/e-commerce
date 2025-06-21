import { prismaClient } from "../config/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import validate from "../validation/validation.js";

export const create = async (body, file) => {
  const product = validate(createProductValidation, body);

  const findProduct = await prismaClient.product.findUnique({
    where: { name: product.name },
  });

  if (findProduct) {
    throw new ResponseError(400, "Product name is already exist!");
  }

  let category = await prismaClient.category.findUnique({
    where: { name: product.categoryName },
  });

  if (!category) {
    category = await prismaClient.category.create({
      data: { name: product.categoryName },
    });
  }

  const imageUrl = file ? `/uploads/${file.filename}` : "";

  return await prismaClient.product.create({
    data: {
      name: product.name,
      description: product.description,
      brand: product.brand,
      image: imageUrl,
      price: product.price,
      stock: product.stock,
      categoryId: category.id,
    },
    select: {
      id: true,
      name: true,
      brand: true,
      description: true,
      image: true,
      price: true,
      stock: true,
      category: true,
    },
  });
};

export const get = async (id) => {
  const findProduct = await prismaClient.product.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      brand: true,
      image: true,
      price: true,
      stock: true,
      category: true,
    },
  });
  if (!findProduct) throw new ResponseError(404, "Product not found!");

  return findProduct;
};

export const update = async (id, request) => {
  const updatedProduct = validate(updateProductValidation, request);
  const findProduct = await prismaClient.product.findUnique({
    where: { id },
  });

  if (!findProduct) {
    throw new ResponseError(404, "Product is not found!");
  }

  let categoryId = findProduct.categoryId;

  if (updatedProduct.categoryName) {
    let category = await prismaClient.category.findUnique({
      where: {
        name: updatedProduct.categoryName,
      },
    });

    if (!category) {
      category = await prismaClient.category.create({
        data: {
          name: updatedProduct.categoryName,
        },
      });
    }

    categoryId = category.id;
  }

  return await prismaClient.product.update({
    where: { id: findProduct.id },
    data: {
      name: updatedProduct.name,
      description: updatedProduct.description,
      image: updatedProduct.image,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      brand: updatedProduct.brand,
      categoryId: categoryId,
    },
    select: {
      name: true,
      description: true,
      brand: true,
      image: true,
      price: true,
      stock: true,
      category: true,
    },
  });
};

export const deleted = async (id) => {
  const product = await prismaClient.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) throw new ResponseError(404, "Product is not found!");

  await prismaClient.product.delete({
    where: {
      id: product.id,
    },
  });

  return product;
};

export const getAllProductsService = async ({
  search,
  categoryName,
  minPrice,
  maxPrice,
}) => {
  const where = {
    ...(search && {
      OR: [
        { name: { contains: search } },
        { description: { contains: search } },
      ],
    }),
    ...(categoryName && {
      category: {
        name: { equals: categoryName },
      },
    }),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: +minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: +maxPrice } : {}),
          },
        }
      : {}),
  };

  return prismaClient.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      brand: true,
      description: true,
      image: true,
      price: true,
      stock: true,
      category: true,
    },
  });
};

export const getPaginatedProducts = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prismaClient.product.findMany({
      skip,
      take: limit,
      include: { category: true },
    }),
    prismaClient.product.count(),
  ]);

  return {
    data: products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTopProducts = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  const productMap = {};

  for (const order of orders) {
    for (const item of order.orderItems) {
      const id = item.productId;
      if (!productMap[id]) {
        productMap[id] = {
          name: item.product.name,
          quantity: 0,
        };
      }
      productMap[id].quantity += item.quantity;
    }
  }
  const topProducts = Object.entries(productMap)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5); // ambil top 5

  return topProducts;
};
