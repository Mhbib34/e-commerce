import Joi from "joi";

export const registerUserValidation = Joi.object({
  username: Joi.string().required().max(100),
  email: Joi.string().required().max(100),
  name: Joi.string().required().max(100),
  password: Joi.string().required().max(255),
  role: Joi.string().valid("USER", "ADMIN", "SELLER").optional(),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(255),
});

export const getUserValidation = Joi.string().uuid().required();

export const updateUserValidation = Joi.object({
  name: Joi.string().required().max(100),
  username: Joi.string().optional().max(100).allow(""),
}).unknown();
