import request from "supertest";
import { createApp } from "../../src/index";

describe("REST API integration", () => {
  it("GET /api/health returns ok", async () => {
    const app = createApp();
    const response = await request(app).get("/api/health").expect(200);
    expect(response.body.status).toBe("ok");
  });

  it("POST /api/transactions and GET /api/balance", async () => {
    const app = createApp();

    await request(app)
      .post("/api/transactions")
      .send({ amount: 1000, type: "income", categoryId: "cat-1", description: "Monthly salary" })
      .expect(201);

    const balance = await request(app).get("/api/balance").expect(200);
    expect(balance.body.balance).toBe(1000);
  });

  it("GET /api/transactions returns created items", async () => {
    const app = createApp();

    await request(app)
      .post("/api/transactions")
      .send({ amount: 50, type: "expense", categoryId: "cat-2", description: "Breakfast" })
      .expect(201);

    const response = await request(app).get("/api/transactions").expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].description).toBe("Breakfast");
  });

  it("GET /api/transactions/export/csv returns csv", async () => {
    const app = createApp();
    const response = await request(app).get("/api/transactions/export/csv").expect(200);
    expect(response.headers["content-type"]).toContain("text/csv");
    expect(response.text).toContain("id,amount,type,categoryId,description,occurredAt");
  });

  it("POST /api/transactions returns 400 when category invalid", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/api/transactions")
      .send({ amount: 100, type: "income", categoryId: "invalid", description: "Test" })
      .expect(400);

    expect(response.body.error).toBe("Category not found");
  });
});
