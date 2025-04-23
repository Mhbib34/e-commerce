import supertest from "supertest";
import { removeAllTestCategory, removeAllTestProduct } from "./test.util.js";
import { app } from "../src/app/app.js";

describe("POST /api/product/create", () => {
  afterEach(async () => {
    await removeAllTestProduct();
    await removeAllTestCategory();
  });

  it("should can create new product", async () => {
    const result = await supertest(app).post("/api/product/create").send({
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
    const result = await supertest(app).post("/api/product/create").send({
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
    let result = await supertest(app).post("/api/product/create").send({
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

    result = await supertest(app).post("/api/product/create").send({
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
});
