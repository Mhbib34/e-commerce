import supertest from "supertest";
import {
  createTestCategory,
  removeAllTestCategory,
  removeAllTestIsUser,
  removeAllTestUser,
} from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/category/create", () => {
  jest.setTimeout(10000);
  afterEach(async () => {
    await removeAllTestCategory();
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

  it("should can create category", async () => {
    const result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(201);
    expect(result.body.category.name).toBe("test category");
  });

  it("should reject if request category is not valid", async () => {
    const result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject if category name already created", async () => {
    let result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test category",
      });
    console.log(result.body);

    expect(result.status).toBe(201);
    expect(result.body.category.name).toBe("test category");

    result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=${tokenAdmin}`])
      .send({
        name: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject create category if token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=asdasdas`])
      .send({
        name: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject create category if role is not admin", async () => {
    const result = await supertest(app)
      .post("/api/category/create")
      .set("Cookie", [`token=${tokenUser}`])
      .send({
        name: "test category",
      });

    console.log(result.body);
    expect(result.status).toBe(403);
  });
});

describe("GET /api/category/get", () => {
  let token;
  beforeEach(async () => {
    await createTestCategory();

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
    await removeAllTestCategory();
    await removeAllTestUser();
  });

  it("should can get category name", async () => {
    const result = await supertest(app)
      .get("/api/category/get")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "test category",
      });
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.category.name).toBe("test category");
  });

  it("should reject get if category name is not found", async () => {
    const result = await supertest(app)
      .get("/api/category/get")
      .set("Cookie", [`token=${token}`])
      .send({
        name: "ini diaa",
      });

    console.log(result.body);
    expect(result.status).toBe(404);
  });
});

describe("GET /api/category/get-all", () => {
  let token;
  beforeEach(async () => {
    await createTestCategory();

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
    await removeAllTestCategory();
    await removeAllTestUser();
  });

  it("should can get all category", async () => {
    const result = await supertest(app)
      .get("/api/category/get-all")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should rejcet get all if token is invalid", async () => {
    const result = await supertest(app)
      .get("/api/category/get-all")
      .set("Cookie", [`token=dadasdas`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/category/delete", () => {
  afterEach(async () => {
    await removeAllTestCategory();
    await removeAllTestUser();
    await removeAllTestIsUser();
  });

  let tokenAdmin;
  let tokenUser;
  beforeEach(async () => {
    await createTestCategory();
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

  it("should can delete category by name query", async () => {
    const result = await supertest(app)
      .delete(`/api/category/delete?name=test%20category`)
      .set("Cookie", [`token=${tokenAdmin}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject if category name is not found", async () => {
    const result = await supertest(app)
      .delete(`/api/category/delete?name=Aasdasd`)
      .set("Cookie", [`token=${tokenAdmin}`]);

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject delete category if role is not admin", async () => {
    const result = await supertest(app)
      .delete(`/api/category/delete?name=test%20category`)
      .set("Cookie", [`token=${tokenUser}`]);

    console.log(result.body);
    expect(result.status).toBe(403);
  });
});
