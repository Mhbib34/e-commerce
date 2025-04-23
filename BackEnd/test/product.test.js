import supertest from "supertest";
import {
  removeAllTestIsUser,
  removeAllTestProduct,
  removeAllTestUser,
} from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/product/create", () => {
  jest.setTimeout(10000);
  afterEach(async () => {
    await removeAllTestProduct();
    await removeAllTestUser();
    await removeAllTestIsUser();
  });

  let tokenAdmin;
  let tokenUser;
  beforeEach(async () => {
    const isAdmin = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
      role: "ADMIN",
    });

    const isUser = await supertest(app).post("/api/user/register").send({
      username: "test user",
      password: "rahasia user",
      name: "test user",
      email: "testuser@gmail.com",
    });

    tokenAdmin = isAdmin.body.token;
    tokenUser = isUser.body.token;
    console.log(tokenAdmin);
    console.log(tokenUser);
  });

  it("should can create new product", async () => {
    const result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(201);
    expect(result.body.product.name).toBe("test product");
    expect(result.body.product.description).toBe("test product");
    expect(result.body.product.price).toBe(100);
    expect(result.body.product.stock).toBe(100);
  });

  it("should reject create product if request is invalid", async () => {
    const result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "",
        description: "",
        price: 100,
        stock: 100,
        categoryName: "",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });
  it("should reject if product name already created", async () => {
    let result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });
    console.log(result.body);

    expect(result.status).toBe(201);
    expect(result.body.product.name).toBe("test product");
    expect(result.body.product.description).toBe("test product");
    expect(result.body.product.price).toBe(100);
    expect(result.body.product.stock).toBe(100);

    result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should reject create new product if token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=dadasd`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject create new product if is not admin", async () => {
    const result = await supertest(app)
      .post("/api/product/create")
      .set("Cookie", [`token=${tokenUser}`])
      .send({
        name: "test product",
        description: "test product",
        price: 100,
        stock: 100,
        categoryName: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(403);
  });
});
