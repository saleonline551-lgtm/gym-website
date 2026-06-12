const request = require("supertest");
const app = require("../server");

describe("Trainer API", () => {

  test("Get all trainer bookings", async () => {

    const response = await request(app)
      .get("/api/trainers");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create trainer booking", async () => {

    const response = await request(app)
      .post("/api/trainers")
      .send({

        name: "Fayaz",
        email: "fayaz@test.com",
        trainer: "John",
        timing: "6 AM"

      });

    console.log(response.body);

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete booking invalid id", async () => {

    const response = await request(app)
      .delete("/api/trainers/123");

    expect([200, 500]).toContain(
      response.statusCode
    );

  });

});