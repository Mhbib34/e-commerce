import Joi from "joi";

export const registerUserValidation = Joi.object({
  username: Joi.string().required().max(100),
  email: Joi.string().required().max(100),
  name: Joi.string().required().max(100),
  password: Joi.string().required().max(255),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(255),
});
