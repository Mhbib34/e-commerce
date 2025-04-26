import supertest from "supertest";
import {
  removeAllTestCategory,
  removeAllTestProduct,
  removeAllTestUserOrder,
} from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/order/create", () => {
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

    token = result.body.token;
    userId = result.body.user.id;

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

  it("should can create order", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`])
      .send({
        items: [
          {
            productId: `${productId}`,
            quantity: 2,
            price: 100,
          },
        ],
      });

    console.log(result.body);
    expect(result.status).toBe(201);
  });

  it("should reject create order if product is empty", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`])
      .send({
        items: [],
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject create order if token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=asasas`])
      .send({
        items: [
          {
            productId: `${productId}`,
            quantity: 2,
            price: 100,
          },
        ],
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
