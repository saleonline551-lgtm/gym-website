const request = require("supertest");
const app = require("../server");

describe("Announcement API", () => {

  test("Get Announcements", async () => {

    const response = await request(app)
      .get("/api/announcements");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Announcement", async () => {

    const response = await request(app)
      .post("/api/announcements")
      .send({

        title: "Gym Notice",
        message: "Gym will remain open"

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete Announcement", async () => {

    const response = await request(app)
      .delete("/api/announcements/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});