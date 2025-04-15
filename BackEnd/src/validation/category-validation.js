import Joi from "joi";

export const createCategoryValidation = Joi.object({
  name: Joi.string().required(),
});
