const request = require("supertest");
const app = require("../server");

describe("Attendance API", () => {

  test("Get Attendance", async () => {

    const response = await request(app)
      .get("/api/attendance");

    expect(response.statusCode)
      .toBe(200);

  });

  test("User Not Found Attendance", async () => {

    const response = await request(app)
      .post("/api/attendance")
      .send({
        email: "notfound@gmail.com"
      });

    expect(response.statusCode)
      .toBe(404);

  });

  test("Get User Attendance History", async () => {

    const response = await request(app)
      .get("/api/attendance/user/test@gmail.com");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Delete Attendance", async () => {

    const response = await request(app)
      .delete("/api/attendance/507f1f77bcf86cd799439011");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Mark Attendance User Not Found", async () => {

  const response = await request(app)
    .post("/api/attendance")
    .send({
      email: "nouser@test.com"
    });

  expect(response.statusCode)
    .toBe(404);

});

test("Attendance History Empty User", async () => {

  const response = await request(app)
    .get("/api/attendance/user/empty@test.com");

  expect(response.statusCode)
    .toBe(200);

  expect(Array.isArray(response.body))
    .toBe(true);

});
test("Attendance User History Invalid Email", async () => {

  const response = await request(app)
    .get("/api/attendance/user/invalid@test.com");

  expect(response.statusCode)
    .toBe(200);

});

test("Delete Attendance Fake ID", async () => {

  const response = await request(app)
    .delete("/api/attendance/507f191e810c19729de860ea");

  expect(response.statusCode)
    .toBe(200);

});

});