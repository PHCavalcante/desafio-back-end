"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.listTasks = listTasks;
exports.getTaskById = getTaskById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const prisma_1 = require("../libs/prisma");
async function createTask(data) {
    return prisma_1.prisma.task.create({ data });
}
async function listTasks() {
    return prisma_1.prisma.task.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: { select: { id: true, name: true, email: true } } },
    });
}
async function getTaskById(id) {
    return prisma_1.prisma.task.findUnique({
        where: { id },
        include: { user: { select: { id: true, name: true, email: true } } },
    });
}
async function updateTask(id, data) {
    return prisma_1.prisma.task.update({ where: { id }, data });
}
async function deleteTask(id) {
    return prisma_1.prisma.task.delete({ where: { id } });
}
