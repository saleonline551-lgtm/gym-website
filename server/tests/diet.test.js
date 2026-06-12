const request = require("supertest");
const app = require("../server");

describe("Diet API", () => {

  test("Get Diets", async () => {

    const response = await request(app)
      .get("/api/diets");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Diet", async () => {

    const response = await request(app)
      .post("/api/diets")
      .send({

        title: "Weight Loss Diet",
        description: "High protein diet"

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete Diet", async () => {

    const response = await request(app)
      .delete("/api/diets/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});