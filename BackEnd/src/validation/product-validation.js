import Joi from "joi";

export const createProductValidation = Joi.object({
  name: Joi.string().required().max(200),
  brand: Joi.string().required().max(100),
  description: Joi.string().required().max(500),
  price: Joi.number().required().positive(),
  stock: Joi.number().required(),
  categoryName: Joi.string().required().max(100),
});

export const getProductValidation = Joi.object({
  name: Joi.string().required().max(200),
});

export const updateProductValidation = Joi.object({
  name: Joi.string().required().max(200),
  brand: Joi.string().optional().max(100),
  description: Joi.string().optional().max(500),
  image: Joi.string().optional().max(500),
  price: Joi.number().optional().positive(),
  stock: Joi.number().optional(),
  categoryName: Joi.string().optional().max(100),
});
