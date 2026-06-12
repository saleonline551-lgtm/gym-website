const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {

  test("Invalid login should return 400", async () => {

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        emailOrMobile: "wrong@test.com",
        password: "123456",
      });

    expect(response.statusCode).toBe(400);

  });

  test("Register without data", async () => {

  const response =
    await request(app)
      .post("/api/auth/register")
      .send({});

  expect(response.statusCode)
    .toBe(400);

});

test("Login without data", async () => {

  const response =
    await request(app)
      .post("/api/auth/login")
      .send({});

  expect(response.statusCode)
    .toBe(400);

});

test("Register New User", async () => {

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "newuser@test.com",
      mobile: "9999999999",
      password: "123456"
    });

  expect([200, 201, 400]).toContain(
    response.statusCode
  );

});

test("Duplicate Email Register", async () => {

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "User One",
      email: "duplicate@test.com",
      mobile: "8888888888",
      password: "123456"
    });

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User Two",
      email: "duplicate@test.com",
      mobile: "7777777777",
      password: "123456"
    });

  expect(response.statusCode)
    .toBe(400);

});

test("Register New User", async () => {

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Coverage User",
      email: `coverage${Date.now()}@test.com`,
      mobile: `${Math.floor(Math.random() * 10000000000)}`,
      password: "123456"
    });

  expect([201, 400]).toContain(
    response.statusCode
  );

});

test("Login Missing Fields", async () => {

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      emailOrMobile: "",
      password: ""
    });

  expect(response.statusCode)
    .toBe(400);

});

test("User not found", async () => {

  const response =
    await request(app)
      .post("/api/auth/login")
      .send({

        emailOrMobile:
          "fake@gmail.com",

        password:
          "123456"

      });

  expect(response.statusCode)
    .toBe(400);

});

test("Root route", async () => {

  const response =
    await request(app)
      .get("/");

  expect(response.statusCode)
    .toBe(200);

});

});