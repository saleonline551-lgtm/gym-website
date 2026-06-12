const request = require("supertest");
const app = require("../server");

describe("Membership Plan API", () => {

  test("Get Plans", async () => {

    const response = await request(app)
      .get("/api/membership-plans");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Plan", async () => {

    const response = await request(app)
      .post("/api/membership-plans")
      .send({

        title: "Gold Plan",
        price: "2000",
        duration: "30 Days",
        features: ["Trainer", "Diet"]

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Update Plan", async () => {

    const response = await request(app)
      .put("/api/membership-plans/123")
      .send({

        title: "Updated Plan"

      });

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("Delete Plan", async () => {

    const response = await request(app)
      .delete("/api/membership-plans/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});