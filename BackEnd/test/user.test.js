import { createTestUser, removeAllTestUser } from "./test.util.js";
import supertest from "supertest";
import { app } from "../src/app/app.js";

describe("POST /api/user/register", () => {
  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can create new user", async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });
    console.log(result.body);

    expect(result.status).toBe(201);
    expect(result.body.user.username).toBe("test");
    expect(result.body.user.name).toBe("test");
    expect(result.body.user.email).toBe("test@gmail.com");
    expect(result.body.user.password).toBeUndefined();
  });

  it("should can reject if request is not valid", async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "",
      password: "",
      name: "",
      email: "",
    });
    console.log(result.body);

    expect(result.status).toBe(400);
  });

  it("should reject if email already registered", async () => {
    let result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });
    console.log(result.body);

    expect(result.status).toBe(201);
    expect(result.body.user.username).toBe("test");
    expect(result.body.user.name).toBe("test");
    expect(result.body.user.email).toBe("test@gmail.com");
    expect(result.body.user.password).toBeUndefined();

    result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });
    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/user/login", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "rahasia",
    });

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    expect(result.body.token).not.toBe("test");
  });

  it("should reject if password is wrong", async () => {
    const result = await supertest(app).post("/api/user/login").send({
      email: "test@gmail.com",
      password: "rah",
    });

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject if email is wrong", async () => {
    const result = await supertest(app).post("/api/user/login").send({
      email: "te@gmail.com",
      password: "rahasia",
    });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});
