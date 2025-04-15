import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { createCategoryValidation } from "../validation/category-validation.js";
import validate from "../validation/validation.js";

export const create = async (request) => {
  const categoryRequest = validate(createCategoryValidation, request);
  const category = await prismaClient.category.findUnique({
    where: {
      name: categoryRequest.name,
    },
  });
  if (category) throw new ResponseError(400, "Category Already Exists!");

  return prismaClient.category.create({
    data: categoryRequest,
    select: {
      id: true,
      name: true,
    },
  });
};
