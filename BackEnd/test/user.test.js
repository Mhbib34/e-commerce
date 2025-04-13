import { removeAllTestUser } from "./test.util";
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
