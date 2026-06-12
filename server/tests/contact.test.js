const request = require("supertest");
const app = require("../server");

describe("Contact API", () => {

  test("Get Contacts", async () => {

    const response = await request(app)
      .get("/api/contact");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Contact Message", async () => {

    const response = await request(app)
      .post("/api/contact")
      .send({
        name: "Fayaz",
        email: "fayaz@test.com",
        subject: "Gym Inquiry",
        message: "Need membership details"
      });

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete Contact Message", async () => {

    const response = await request(app)
      .delete("/api/contact/507f1f77bcf86cd799439011");

    expect(response.statusCode)
      .toBe(200);

  });

});