const request = require("supertest");
const app = require("./app");

describe("GET /transactiondb", () => {
  it("responds with JSON message", async () => {
    const response = await request(app).get("/transaction");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(3);
  });
});
describe("POST /transactiondb", () => {
  it("responds with JSON message and creates a user", async () => {
    const userData = { name: "John Doe", email: "john@example.com" };
    const response = await request(app).post("/transaction").send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      name: userData.name,
    });
  });
});
