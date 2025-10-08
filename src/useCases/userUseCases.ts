import { prisma } from "../libs/prisma";
import type { CreateUserInput, UpdateUserInput } from "..//validators/userSchemas";

export async function createUser(data: CreateUserInput) {
    return prisma.user.create({ data });
}

export async function listUsers() {
    return prisma.user.findMany({ orderBy: { createdAt:  "desc" }});
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function updateUser(id: string, data: UpdateUserInput) {
    return prisma.user.update({ where: { id }, data})
}

export async function deleteUser(id: string) {
    return prisma.user.delete({ where: { id }});
}

