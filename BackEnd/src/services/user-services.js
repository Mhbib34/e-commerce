import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
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
      id: true,
      name: true,
      email: true,
      username: true,
      isAccountVerified: true,
    },
  });
};

export const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      password: true,
    },
  });
  if (!user) throw new ResponseError(401, "Email or password is wrong!");

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid)
    throw new ResponseError(401, "Email or password is wrong!");

  return user;
};
