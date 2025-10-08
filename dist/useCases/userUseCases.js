"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.listUsers = listUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const prisma_1 = require("../libs/prisma");
async function createUser(data) {
    return prisma_1.prisma.user.create({ data });
}
async function listUsers() {
    return prisma_1.prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}
async function getUserById(id) {
    return prisma_1.prisma.user.findUnique({ where: { id } });
}
async function updateUser(id, data) {
    return prisma_1.prisma.user.update({ where: { id }, data });
}
async function deleteUser(id) {
    return prisma_1.prisma.user.delete({ where: { id } });
}
