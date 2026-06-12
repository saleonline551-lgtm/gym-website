const request = require("supertest");
const app = require("../server");

describe("Workout API", () => {

  test("Get Workouts", async () => {

    const response = await request(app)
      .get("/api/workouts");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Create Workout", async () => {

    const response = await request(app)
      .post("/api/workouts")
      .send({

        title: "Chest Workout",
        category: "Gym",
        exercises: "Pushups, Bench Press"

      });

    console.log(response.body);

    expect(response.statusCode)
      .toBe(201);

  });

  test("Delete Workout Invalid Id", async () => {

    const response = await request(app)
      .delete("/api/workouts/123");

    expect([200, 500]).toContain(
      response.statusCode
    );

  });

});