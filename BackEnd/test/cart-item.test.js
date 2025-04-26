import supertest from "supertest";
import {
  removeAllTestCategory,
  removeAllTestProduct,
  removeAllTestUserOrder,
} from "./test.util.js";
import { app } from "../src/app/app";

describe("POST /api/cart-item/add-to-cart", () => {
  jest.setTimeout(10000);
  let productId;
  let token;
  let userId;
  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    userId = result.body.user.id;
    token = result.body.token;

    const product = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });

    productId = product.body.product.id;
    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
  });

  it("should can create cart item", async () => {
    const result = await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId,
        quantity: 2,
      });

    console.log(result.body);
    expect(result.status).toBe(201);
  });

  it("should reject create cart item if productId is not found", async () => {
    const result = await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: "asdasdasdasdasdas",
        quantity: 2,
      });

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject create cart item if token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=dadssadsa`])
      .send({
        productId,
        quantity: 2,
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
