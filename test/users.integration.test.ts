import { vi, describe, beforeEach, it, expect } from "vitest";

vi.mock("../src/libs/prisma", async () => {
  const { prisma } = await import("./mocks/prisma");
  return { prisma };
});

import request from "supertest";
import app from "../src/app";
import { prisma } from "./mocks/prisma";

describe("Users API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /users should create user", async () => {
    prisma.user.create.mockResolvedValue({ id: "1", name: "Ana", email: "ana@mail.com" });

    const res = await request(app)
      .post("/users")
      .send({ name: "Ana", email: "ana@mail.com" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: "1", name: "Ana", email: "ana@mail.com" });
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("GET /users should list users", async () => {
    prisma.user.findMany.mockResolvedValue([{ id: "1", name: "Ana", email: "ana@mail.com" }]);

    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it("GET /users/:id returns 404 when not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app).get("/users/xxx");
    expect(res.status).toBe(404);
  });
});


