
import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/health", () => {
  it("returns HTTP 200 and the expected JSON response", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body).toMatchObject({
      status: "ok",
      service: "WaterTracker API",
    });
  });

  it("works without authentication", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
  });
});
