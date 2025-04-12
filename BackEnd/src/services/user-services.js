import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import validate from "../validation/validation.js";
import bcrypt from "bcrypt";

export const create = async (request) => {
  const user = validate(registerUserValidation, request);
  const findUser = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (findUser)
    throw new ResponseError(
      400,
      "Email already exists. Please use another email."
    );

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      name: true,
      email: true,
      username: true,
      isAccountVerified: true,
    },
  });
};
