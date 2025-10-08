"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1),
    email: zod_1.default.email()
});
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(1).optional(),
    email: zod_1.default.email().optional()
});
