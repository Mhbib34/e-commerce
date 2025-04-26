import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import validate from "../validation/validation.js";

export const create = async (request) => {
  const product = validate(createProductValidation, request);

  const findProduct = await prismaClient.product.findUnique({
    where: {
      name: product.name,
    },
  });

  if (findProduct) {
    throw new ResponseError(400, "Product name is already exist!");
  }

  let category = await prismaClient.category.findUnique({
    where: {
      name: product.categoryName,
    },
  });

  if (!category) {
    category = await prismaClient.category.create({
      data: {
        name: product.categoryName,
      },
    });
  }

  return await prismaClient.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: category.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      stock: true,
      category: true,
    },
  });
};

export const get = async (request) => {
  const { name } = validate(getProductValidation, request);
  const findProduct = await prismaClient.product.findUnique({
    where: {
      name,
    },
    select: {
      name: true,
      description: true,
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
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      categoryId: categoryId,
    },
    select: {
      name: true,
      description: true,
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
      description: true,
      price: true,
      stock: true,
      category: true,
    },
  });
};
