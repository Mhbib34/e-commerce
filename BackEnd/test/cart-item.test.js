import supertest from "supertest";
import {
  removeAllTestCategory,
  removeAllTestProduct,
  removeAllTestUserCartEmpty,
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

describe("GET /api/cart-item/get-cart", () => {
  let productId;
  let token;
  let userId;
  let userCardEmpty;
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

    const cart = await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId,
        quantity: 2,
      });

    const cartEmpty = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
    });

    userCardEmpty = cartEmpty.body.token;

    console.log(cart.body);
    console.log(result.body);
    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can get cart item", async () => {
    const result = await supertest(app)
      .get("/api/cart-item/get-cart")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject get cart item if token or user id is not valid", async () => {
    const result = await supertest(app)
      .get("/api/cart-item/get-cart")
      .set("Cookie", [`token=dadasd`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject get cart item if cart still empty", async () => {
    const result = await supertest(app)
      .get("/api/cart-item/get-cart")
      .set("Cookie", [`token=${userCardEmpty}`]);

    console.log(result.body);
    expect(result.status).toBe(400);
  });
});

describe("DELETE /api/cart-item/remove-cart", () => {
  let productId;
  let token;
  let userId;
  let cartItemId;
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

    const cart = await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId,
        quantity: 2,
      });

    cartItemId = cart.body.cart.id;

    console.log(cart.body);
    console.log(result.body);
    console.log(token);
    console.log(cartItemId);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can remove cart item", async () => {
    const result = await supertest(app)
      .delete("/api/cart-item/remove-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        cartItemId,
      });

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject remove cart item if cart id is invalid", async () => {
    const result = await supertest(app)
      .delete("/api/cart-item/remove-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        cartItemId: "asdasdasdas",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject remove cart item if token is invalid", async () => {
    const result = await supertest(app)
      .delete("/api/cart-item/remove-cart")
      .set("Cookie", [`token=asdsad`])
      .send({
        cartItemId,
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
