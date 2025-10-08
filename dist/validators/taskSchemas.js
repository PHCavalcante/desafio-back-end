"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.CreateTaskSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateTaskSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    description: zod_1.default.string().min(1),
    status: zod_1.default.enum(["pending", "done"]).default("pending"),
    userId: zod_1.default.uuid()
});
exports.updateTaskSchema = zod_1.default.object({
    title: zod_1.default.string().min(1).optional(),
    description: zod_1.default.string().min(1).optional(),
    status: zod_1.default.enum(["pending", "done"]).optional()
});
