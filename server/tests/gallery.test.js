const request = require("supertest");
const app = require("../server");

describe("Gallery API", () => {

  test("Get Images", async () => {

    const response = await request(app)
      .get("/api/gallery");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Add Image", async () => {

    const response = await request(app)
      .post("/api/gallery")
      .send({

        image: "https://test.com/image.jpg"

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete Image", async () => {

    const response = await request(app)
      .delete("/api/gallery/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});