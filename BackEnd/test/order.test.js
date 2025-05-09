import supertest from "supertest";
import {
  removeAllTestCategory,
  removeAllTestIsUser,
  removeAllTestProduct,
  removeAllTestUserCartEmpty,
  removeAllTestUserOrder,
} from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/order/create", () => {
  jest.setTimeout(10000);
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

    const userCart = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    token = result.body.token;
    userId = result.body.user.id;
    userCardEmpty = userCart.body.token;

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

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: productId,
        quantity: 2,
      });
    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can create order", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(201);
  });

  it("should reject create order if token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=asasas`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject create order if product is empty", async () => {
    const result = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${userCardEmpty}`]);

    console.log(result.body);
    expect(result.status).toBe(400);
  });
});

describe("GET /api/order/get", () => {
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

    const userCart = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    token = result.body.token;
    userId = result.body.user.id;
    userCardEmpty = userCart.body.token;

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

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${userCardEmpty}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`]);
    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can get order", async () => {
    const result = await supertest(app)
      .get("/api/order/get")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject get order if cart is empty", async () => {
    const result = await supertest(app)
      .get("/api/order/get")
      .set("Cookie", [`token=${userCardEmpty}`]);

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject get order if token is not valid", async () => {
    const result = await supertest(app)
      .get("/api/order/get")
      .set("Cookie", [`token=asdasd`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("GET /api/order/get/:id", () => {
  let productId;
  let token;
  let userId;
  let userCardEmpty;
  let orderId;
  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
      role: "ADMIN",
    });

    const userCart = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    token = result.body.token;
    userId = result.body.user.id;
    userCardEmpty = userCart.body.token;

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

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${userCardEmpty}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    const order = await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`]);

    orderId = order.body.order.id;
    console.log(order.body);

    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can get order by id", async () => {
    const result = await supertest(app)
      .get(`/api/order/get/${orderId}`)
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject get order by id if orderId is not found", async () => {
    const result = await supertest(app)
      .get(`/api/order/get/asdasdasdas`)
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject get order by id if token is not valid", async () => {
    const result = await supertest(app)
      .get(`/api/order/get/${orderId}`)
      .set("Cookie", [`token=asdasd`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("GET /api/order/get-all", () => {
  let productId;
  let token;
  let userId;
  let userCardEmpty;
  let isNotAdmin;
  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
      role: "ADMIN",
    });

    const userCart = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    token = result.body.token;
    userId = result.body.user.id;
    userCardEmpty = userCart.body.token;

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

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${userCardEmpty}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`]);

    const notAdmin = await supertest(app).post("/api/user/register").send({
      username: "test user",
      password: "rahasia user",
      name: "test user",
      email: "testuser@gmail.com",
    });

    isNotAdmin = notAdmin.body.token;
    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
    await removeAllTestIsUser();
  });

  it("should can get all order", async () => {
    const result = await supertest(app)
      .get("/api/order/get-all")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject get all order if is not admin", async () => {
    const result = await supertest(app)
      .get("/api/order/get-all")
      .set("Cookie", [`token=${isNotAdmin}`]);

    console.log(result.body);
    expect(result.status).toBe(403);
  });
});

describe("GET /api/order/get-order", () => {
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

    const userCart = await supertest(app).post("/api/user/register").send({
      username: "test empty",
      password: "rahasia empty",
      name: "test empty",
      email: "testempty@gmail.com",
      role: "ADMIN",
    });
    console.log(result.body);

    token = result.body.token;
    userId = result.body.user.id;
    userCardEmpty = userCart.body.token;

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

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${token}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/cart-item/add-to-cart")
      .set("Cookie", [`token=${userCardEmpty}`])
      .send({
        productId: productId,
        quantity: 2,
      });

    await supertest(app)
      .post("/api/order/create")
      .set("Cookie", [`token=${token}`]);

    console.log(token);
    console.log(productId);
  });
  afterEach(async () => {
    await removeAllTestUserOrder(userId);
    await removeAllTestProduct();
    await removeAllTestCategory();
    await removeAllTestUserCartEmpty();
  });

  it("should can get order by user id", async () => {
    const result = await supertest(app)
      .get(`/api/order/get-order/${userId}`)
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject get order by user id if user id is not found", async () => {
    const result = await supertest(app)
      .get(`/api/order/get-order/asdasd`)
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject get order by user id if token is not valid", async () => {
    const result = await supertest(app)
      .get(`/api/order/get-order/${userId}`)
      .set("Cookie", [`token=asdas`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
