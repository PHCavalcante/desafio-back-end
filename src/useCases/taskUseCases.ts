import { prisma } from "../libs/prisma";
import type {CreateTaskInput, UpdateTaskInput } from "../validators/taskSchemas";

export async function createTask(data: CreateTaskInput) {
  return prisma.task.create({ data });
}

export async function listTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function updateTask(id: string, data: UpdateTaskInput) {
  return prisma.task.update({ where: { id }, data });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}