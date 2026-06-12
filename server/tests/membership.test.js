const request = require("supertest");
const app = require("../server");
const Membership = require("../models/Membership");

describe("Membership API", () => {

  let membershipId;

  test("Create Membership", async () => {

    const response = await request(app)
      .post("/api/membership")
      .send({
        name: "Fayaz",
        email: "fayaz@gmail.com",
        mobile: "9876543210",
        plan: "Monthly",
        amount: 1000
      });

    expect(response.statusCode)
      .toBe(201);

    membershipId =
      response.body.membership._id;

  });

  test("Get Membership Error", async () => {

  jest
    .spyOn(Membership, "find")
    .mockImplementationOnce(() => {
      throw new Error("DB Error");
    });

  const response =
    await request(app)
      .get("/api/membership");

  expect(response.statusCode)
    .toBe(500);

});

test("Customer Error", async () => {

  jest
    .spyOn(Membership, "findOne")
    .mockImplementationOnce(() => {
      throw new Error("DB Error");
    });

  const response =
    await request(app)
      .get("/api/membership/customer/test@gmail.com");

  expect(response.statusCode)
    .toBe(500);

});

test("Delete Membership Error", async () => {

  jest
    .spyOn(Membership, "findByIdAndDelete")
    .mockImplementationOnce(() => {
      throw new Error("DB Error");
    });

  const response =
    await request(app)
      .delete("/api/membership/507f1f77bcf86cd799439011");

  expect(response.statusCode)
    .toBe(500);

});
test("Create Quarterly Membership", async () => {

  const response = await request(app)
    .post("/api/membership")
    .send({
      name: "Quarter User",
      email: "quarter@gmail.com",
      mobile: "9999999991",
      plan: "Quarterly",
      amount: 3000
    });

  expect(response.statusCode)
    .toBe(201);

});
test("Create Yearly Membership", async () => {

  const response = await request(app)
    .post("/api/membership")
    .send({
      name: "Year User",
      email: "year@gmail.com",
      mobile: "9999999992",
      plan: "Yearly",
      amount: 10000
    });

  expect(response.statusCode)
    .toBe(201);

});
test("Update Plan Fake ID", async () => {

  const response = await request(app)
    .put("/api/membership/update-plan/507f191e810c19729de860ea")
    .send({
      workoutPlan: "Test",
      dietPlan: "Test"
    });

  expect(response.statusCode)
    .toBe(200);

});
test("Delete Fake Membership", async () => {

  const response = await request(app)
    .delete("/api/membership/507f191e810c19729de860ea");

  expect(response.statusCode)
    .toBe(200);

});


  test("Get All Memberships", async () => {

    const response = await request(app)
      .get("/api/membership");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Get Customer By Email", async () => {

    const response = await request(app)
      .get("/api/membership/customer/fayaz@gmail.com");

    expect(response.statusCode)
      .toBe(200);

  });

  test("Customer Not Found", async () => {

    const response = await request(app)
      .get("/api/membership/customer/fake@gmail.com");

    expect(response.statusCode)
      .toBe(404);

  });

  test("Update Workout And Diet Plan", async () => {

    const response = await request(app)
      .put(`/api/membership/update-plan/${membershipId}`)
      .send({
        workoutPlan: "Chest Day",
        dietPlan: "High Protein"
      });

    expect(response.statusCode)
      .toBe(200);

  });

  test("Renew Membership", async () => {

    const response = await request(app)
      .put(`/api/membership/renew/${membershipId}`);

    expect(response.statusCode)
      .toBe(200);

  });

  test("Membership Not Found", async () => {

    const response = await request(app)
      .put("/api/membership/renew/507f1f77bcf86cd799439011");

    expect(response.statusCode)
      .toBe(404);

  });

  test("Delete Membership", async () => {

    const response = await request(app)
      .delete(`/api/membership/${membershipId}`);

    expect(response.statusCode)
      .toBe(200);

  });

  test("Get Customer Not Found", async () => {

  const response = await request(app)
    .get("/api/membership/customer/notfound@gmail.com");

  expect(response.statusCode)
    .toBe(404);

});


test("Update Workout And Diet Plan", async () => {

  const response = await request(app)
    .put("/api/membership/update-plan/507f1f77bcf86cd799439011")
    .send({
      workoutPlan: "Chest Workout",
      dietPlan: "Protein Diet"
    });

  expect(response.statusCode)
    .toBe(200);

});


test("Renew Membership Not Found", async () => {

  const response = await request(app)
    .put("/api/membership/renew/507f1f77bcf86cd799439011");

  expect(response.statusCode)
    .toBe(404);

});


test("Delete Membership", async () => {

  const response = await request(app)
    .delete("/api/membership/507f1f77bcf86cd799439011");

  expect(response.statusCode)
    .toBe(200);

});

});