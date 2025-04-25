import supertest from "supertest";
import {
  createTestCategory,
  createTestProduct,
  removeAllTestCategory,
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
    await removeAllTestCategory();
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

describe("GET /api/product/get", () => {
  let token;
  beforeEach(async () => {
    await createTestCategory();
    await createTestProduct();
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });

    token = result.body.token;
    console.log(token);
  });
  afterEach(async () => {
    await removeAllTestUser();
    await removeAllTestProduct();
    await removeAllTestCategory();
  });

  it("should can get product by name", async () => {
    const result = await supertest(app)
      .get("/api/product/get")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "test product",
      });

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.product.name).toBe("test product");
    expect(result.body.product.category.name).toBe("test category");
  });

  it("should reject if product is not found", async () => {
    const result = await supertest(app)
      .get("/api/product/get")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "test",
      });

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject get product if token is not valid", async () => {
    const result = await supertest(app)
      .get("/api/product/get")
      .set("Cookie", [`token=asdadasd`])
      .send({
        name: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("PATCH /api/product/update", () => {
  let tokenAdmin;
  let tokenUser;
  let product;

  beforeEach(async () => {
    product = await createTestProduct();

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
  });
  afterEach(async () => {
    await removeAllTestProduct();
    await removeAllTestUser();
    await removeAllTestIsUser();
    await removeAllTestCategory();
  });

  it("should can update product", async () => {
    const result = await supertest(app)
      .patch(`/api/product/update/${product.id}`)
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test baru",
        description: "test baru",
        price: 200,
        stock: 200,
        categoryName: "test baru",
      });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.product.name).toBe("test baru");
    expect(result.body.product.description).toBe("test baru");
    expect(result.body.product.category.name).toBe("test baru");
    expect(result.body.product.price).toBe(200);
    expect(result.body.product.stock).toBe(200);
  });

  it("should reject if request update product is not valid", async () => {
    const result = await supertest(app)
      .patch(`/api/product/update/${product.id}`)
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "",
        description: "test baru",
        price: 200,
        stock: 200,
        categoryName: "test baru",
      });

    console.log(result.body);

    expect(result.status).toBe(400);
  });

  it("should reject update product if is not admin", async () => {
    const result = await supertest(app)
      .patch(`/api/product/update/${product.id}`)
      .set("Cookie", [`token=${tokenUser}`])
      .send({
        name: "test baru",
        description: "test baru",
        price: 200,
        stock: 200,
        categoryName: "test baru",
      });

    console.log(result.body);

    expect(result.status).toBe(403);
  });

  it("should reject update product if token is not valid", async () => {
    const result = await supertest(app)
      .patch(`/api/product/update/${product.id}`)
      .set("Cookie", [`token=asdadas`])
      .send({
        name: "test baru",
        description: "test baru",
        price: 200,
        stock: 200,
        categoryName: "test baru",
      });

    console.log(result.body);

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/product/delete/:id", () => {
  let tokenAdmin;
  let tokenUser;
  let product;

  beforeEach(async () => {
    product = await createTestProduct();

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
  });
  afterEach(async () => {
    await removeAllTestProduct();
    await removeAllTestUser();
    await removeAllTestIsUser();
    await removeAllTestCategory();
  });

  it("should can delete product", async () => {
    const result = await supertest(app)
      .delete(`/api/product/delete/${product.id}`)
      .set("Cookie", [`token=${tokenAdmin}`]);

    console.log(result.body);

    expect(result.status).toBe(200);
  });

  it("should reject delete product if productId is not found", async () => {
    const result = await supertest(app)
      .delete(`/api/product/delete/dadsadasd`)
      .set("Cookie", [`token=${tokenAdmin}`]);

    console.log(result.body);

    expect(result.status).toBe(404);
  });

  it("should reject delete product if is not admin", async () => {
    const result = await supertest(app)
      .delete(`/api/product/delete/${product.id}`)
      .set("Cookie", [`token=${tokenUser}`]);

    console.log(result.body);

    expect(result.status).toBe(403);
  });

  it("should reject delete product if token is not valid", async () => {
    const result = await supertest(app)
      .delete(`/api/product/delete/${product.id}`)
      .set("Cookie", [`token=dadasd`]);

    console.log(result.body);

    expect(result.status).toBe(401);
  });
});

describe("GET /api/product/get-all", () => {
  let token;

  beforeEach(async () => {
    await createTestProduct();
    const user = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });

    token = user.body.token;
  });

  afterEach(async () => {
    await removeAllTestProduct();
    await removeAllTestUser();
    await removeAllTestCategory();
  });

  it("should return all products", async () => {
    const result = await supertest(app)
      .get("/api/product/get-all")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should return products by search query", async () => {
    const result = await supertest(app)
      .get("/api/product/get-all?search=test")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should return empty if no match found", async () => {
    const result = await supertest(app)
      .get("/api/product/get-all?search=nothingmatch")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.product).toEqual([]);
  });

  it("should reject get all if token is not valid", async () => {
    const result = await supertest(app)
      .get("/api/product/get-all?search=test")
      .set("Cookie", [`token=dada`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
