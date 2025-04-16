import { createTestUser, removeAllTestUser } from "./test.util.js";
import supertest from "supertest";
import { app } from "../src/app/app.js";
import { prismaClient } from "../src/app/database.js";
import { log } from "winston";

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

describe("POST /api/user/logout", () => {
  let token;
  beforeEach(async () => {
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
  });

  it("should can logout", async () => {
    const result = await supertest(app)
      .post("/api/user/logout")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject logout if token is invalid", async () => {
    const result = await supertest(app)
      .post("/api/user/logout")
      .set("Cookie", [`token=asdasdas`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("GET /api/user/get", () => {
  let token;
  beforeEach(async () => {
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
  });

  it("should can get user", async () => {
    const result = await supertest(app)
      .get("/api/user/get")
      .set("Cookie", [`token=${token}`]);

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.user.username).toBe("test");
    expect(result.body.user.name).toBe("test");
    expect(result.body.user.email).toBe("test@gmail.com");
  });

  it("should reject if token is not valid", async () => {
    const result = await supertest(app)
      .get("/api/user/get")
      .set("Cookie", [`token=asasas`]);

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("POST /api/user/send-verify-otp", () => {
  let token;
  beforeEach(async () => {
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
  });

  it("should can send verify otp", async () => {
    const result = await supertest(app)
      .post("/api/user/send-verify-otp")
      .set("Cookie", [`token=${token}`]);

    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe("Verification OTP sent on email");
  });

  it("should reject if send verify otp is invalid", async () => {
    const result = await supertest(app)
      .post("/api/user/send-verify-otp")
      .set("Cookie", [`token=asasasas`]);

    expect(result.status).toBe(401);
  });
});

describe("POST /api/user/verify-email", () => {
  let token;
  let userId;

  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });

    token = result.body.token;

    await supertest(app)
      .post("/api/user/send-verify-otp")
      .set("Cookie", [`token=${token}`]);

    const user = await prismaClient.user.findUnique({
      where: {
        email: "test@gmail.com",
      },
    });

    userId = user.id;
  });

  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should verify email successfully with valid OTP", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.verifyOtp;

    const result = await supertest(app)
      .post("/api/user/verify-email")
      .set("Cookie", [`token=${token}`])
      .send({ otp });

    console.log(otp);

    expect(result.statusCode).toBe(200);
    expect(result.body.success).toBe(true);
    expect(result.body.message).toBe("Email verified successfully");
    expect(result.body.user.isAccountVerified).toBe(true);
  });

  it("should reject if verify email token is invalid", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.verifyOtp;

    const result = await supertest(app)
      .post("/api/user/verify-email")
      .set("Cookie", [`token=dasdadas`])
      .send({ otp });

    console.log(otp);

    expect(result.statusCode).toBe(401);
  });

  it("should reject if otp is invalid", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.verifyOtp;

    const result = await supertest(app)
      .post("/api/user/verify-email")
      .set("Cookie", [`token=${token}`])
      .send({ otp: 121212 });

    console.log(otp);

    expect(result.statusCode).toBe(400);
  });
});

describe("POST /api/user/send-reset-password-otp", () => {
  let token;
  let email;
  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });
    email = result.body.user.email;
    token = result.body.token;
    console.log(token);
  });
  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can send reset password otp", async () => {
    const result = await supertest(app)
      .post("/api/user/send-reset-password-otp")
      .set("Cookie", [`token=${token}`])
      .send({
        email,
      });

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject if email is not found", async () => {
    const result = await supertest(app)
      .post("/api/user/send-reset-password-otp")
      .set("Cookie", [`token=${token}`])
      .send({
        email: "asasas@gmail.com",
      });

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject if reset password token is not valid", async () => {
    const result = await supertest(app)
      .post("/api/user/send-reset-password-otp")
      .set("Cookie", [`token=dadsadas`])
      .send({
        email,
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });
});

describe("POST /api/user/reset-password", () => {
  jest.setTimeout(10000);
  let token;
  let userId;
  let email;

  beforeEach(async () => {
    const result = await supertest(app).post("/api/user/register").send({
      username: "test",
      password: "rahasia",
      name: "test",
      email: "test@gmail.com",
    });

    token = result.body.token;
    email = result.body.user.email;
    console.log(token);
    console.log(email);

    const sendOtp = await supertest(app)
      .post("/api/user/send-reset-password-otp")
      .set("Cookie", [`token=${token}`])
      .send({
        email,
      });

    console.log(sendOtp.body);

    const user = await prismaClient.user.findUnique({
      where: {
        email: "test@gmail.com",
      },
    });

    userId = user.id;
  });

  afterEach(async () => {
    await removeAllTestUser();
  });

  it("should can reset password", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);

    console.log(userId);
    const otp = user.resetOtp;

    const result = await supertest(app)
      .post("/api/user/reset-password")
      .set("Cookie", [`token=${token}`])
      .send({
        email,
        otp,
        newPassword: "rahasia baru",
      });

    console.log(result.body);
    expect(result.status).toBe(200);
  });

  it("should reject if reset password token is not valid", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.resetOtp;

    const result = await supertest(app)
      .post("/api/user/reset-password")
      .set("Cookie", [`token=asdasdasdas`])
      .send({
        email,
        otp,
        newPassword: "rahasia baru",
      });

    console.log(result.body);
    expect(result.status).toBe(401);
  });

  it("should reject if new password same as old", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.resetOtp;

    const result = await supertest(app)
      .post("/api/user/reset-password")
      .set("Cookie", [`token=${token}`])
      .send({
        email,
        otp,
        newPassword: "rahasia",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });

  it("should reject if reset password email is wrong", async () => {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    const otp = user.resetOtp;

    const result = await supertest(app)
      .post("/api/user/reset-password")
      .set("Cookie", [`token=${token}`])
      .send({
        email: "asasa@gmail.com",
        otp,
        newPassword: "rahasia baru",
      });

    console.log(result.body);
    expect(result.status).toBe(404);
  });

  it("should reject if reset password otp is not valid", async () => {
    const result = await supertest(app)
      .post("/api/user/reset-password")
      .set("Cookie", [`token=${token}`])
      .send({
        email,
        otp: 12345,
        newPassword: "rahasia baru",
      });

    console.log(result.body);
    expect(result.status).toBe(400);
  });
});
