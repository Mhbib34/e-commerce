import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createProductValidation,
  getProductValidation,
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
