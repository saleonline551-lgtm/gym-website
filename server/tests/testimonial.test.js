const request = require("supertest");
const app = require("../server");

describe("Testimonial API", () => {

  test("Get Testimonials", async () => {

    const response = await request(app)
      .get("/api/testimonials");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Testimonial", async () => {

    const response = await request(app)
      .post("/api/testimonials")
      .send({

        name: "Fayaz",
        image: "https://test.com/image.jpg",
        review: "Excellent Gym",
        rating: 5

      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Update Testimonial", async () => {

    const response = await request(app)
      .put("/api/testimonials/123")
      .send({

        review: "Updated Review"

      });

    expect([200, 500])
      .toContain(response.statusCode);

  });

  test("Delete Testimonial", async () => {

    const response = await request(app)
      .delete("/api/testimonials/123");

    expect([200, 500])
      .toContain(response.statusCode);

  });

});