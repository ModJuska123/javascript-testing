const request = require("supertest");
const app = require("./app");

describe("GET /transaction", () => {
  it("responds with JSON message", async () => {
    const response = await request(app).get("/transaction");
    expect(response.statusCode).toBe(200);
    // Uncomment and adjust this line according to your expected data
    // expect(response.body.length).toEqual(9);
  });
});

describe("POST /transaction", () => {
  it("responds with JSON message and creates a transaction", async () => {
    const transactionData = { amount: 100, userFrom: 1, userTo: 2 };
    const response = await request(app)
      .post("/transaction")
      .send(transactionData);

    expect(response.statusCode).toBe(200);
    // Expect the returned data to have an "id" property
    expect(response.body).toHaveProperty("id");
  });
});
