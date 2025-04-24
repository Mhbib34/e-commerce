import Joi from "joi";

export const createProductValidation = Joi.object({
  name: Joi.string().required().max(200),
  description: Joi.string().required().max(500),
  price: Joi.number().required().positive(),
  stock: Joi.number().required().positive(),
  categoryName: Joi.string().required().max(100),
});

export const getProductValidation = Joi.object({
  name: Joi.string().required().max(200),
});
