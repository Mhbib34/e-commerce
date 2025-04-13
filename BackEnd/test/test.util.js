import { prismaClient } from "../src/app/database.js";

export const removeAllTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      name: "test",
    },
  });
};
