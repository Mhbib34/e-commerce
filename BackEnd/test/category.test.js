import supertest from "supertest";
import { createTestCategory, removeAllTestCategory } from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/category/create", () => {
  jest.setTimeout(10000);
  afterEach(async () => {
    await removeAllTestCategory();
  });

  it("should can create category", async () => {
    const result = await supertest(app).post("/api/category/create").send({
      name: "test category",
    });

    console.log(result.body);
    expect(result.status).toBe(201);
    expect(result.body.category.name).toBe("test category");
  });

  it("should reject if request category is not valid", async () => {
    const result = await supertest(app).post("/api/category/create").send({
      name: "",
    });

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject if category name already created", async () => {
    let result = await supertest(app).post("/api/category/create").send({
      name: "test category",
    });
    console.log(result.body);

    expect(result.status).toBe(201);
    expect(result.body.category.name).toBe("test category");

    result = await supertest(app).post("/api/category/create").send({
      name: "test category",
    });

    console.log(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/category/get", () => {
  beforeEach(async () => {
    await createTestCategory();
  });
  afterEach(async () => {
    await removeAllTestCategory();
  });

  it("should can get category name", async () => {
    const result = await supertest(app).get("/api/category/get").send({
      name: "test category",
    });
    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.category.name).toBe("test category");
  });

  it("should reject if category name is not found", async () => {
    const result = await supertest(app).get("/api/category/get").send({
      name: "ini diaa",
    });
    console.log(result.body);

    expect(result.status).toBe(404);
  });
});

describe("GET /api/category/get-all", () => {
  beforeEach(async () => {
    await createTestCategory();
  });
  afterEach(async () => {
    await removeAllTestCategory();
  });

  it("should can get all category", async () => {
    const result = await supertest(app).get("/api/category/get-all");

    console.log(result.body);
    expect(result.status).toBe(200);
  });
});

describe("DELETE /api/category/delete", () => {
  beforeEach(async () => {
    await createTestCategory();
  });
  afterEach(async () => {
    await removeAllTestCategory();
  });

  it("should can delete category by name query", async () => {
    const result = await supertest(app).delete(
      `/api/category/delete?name=test%20category`
    );

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject if category name is not found", async () => {
    const result = await supertest(app).delete(
      `/api/category/delete?name=Aasdasd`
    );

    console.log(result.body);
    expect(result.status).toBe(404);
  });
});
