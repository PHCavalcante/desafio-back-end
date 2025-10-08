import { vi, describe, beforeEach, it, expect } from "vitest";

vi.mock("../src/libs/prisma", async () => {
  const { prisma } = await import("./mocks/prisma");
  return { prisma };
});

import request from "supertest";
import app from "../src/app";
import { prisma } from "./mocks/prisma";

describe("Tasks API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /tasks should create task", async () => {
    prisma.task.create.mockResolvedValue({ id: "t1", title: "Teste", description: "desc", status: "pending", userId: "b4c0a3d8-5e6a-4f1c-9a2b-4c2e7d6a9f01" });
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Teste", description: "desc", userId: "b4c0a3d8-5e6a-4f1c-9a2b-4c2e7d6a9f01" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: "t1", title: "Teste", description: "desc", status: "pending", userId: "b4c0a3d8-5e6a-4f1c-9a2b-4c2e7d6a9f01" });
  });

  it("GET /tasks should list tasks", async () => {
    prisma.task.findMany.mockResolvedValue([]);
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});


