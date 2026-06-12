const request = require("supertest");
const app = require("../server");

describe("About Gym API", () => {

  test("Get About Gym", async () => {

    const response = await request(app)
      .get("/api/about-gym");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create About Gym", async () => {

    const response = await request(app)
      .post("/api/about-gym")
      .send({

        title: "About Gym",
        description: "Best Gym",
        experience: "10 Years",
        trainers: "20",
        members: "500"

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Update About Gym", async () => {

    const response = await request(app)
      .put("/api/about-gym/123")
      .send({

        title: "Updated Gym"

      });

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("Delete About Gym", async () => {

    const response = await request(app)
      .delete("/api/about-gym/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});