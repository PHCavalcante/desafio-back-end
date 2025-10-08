"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.listUsers = listUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
const userSchemas_1 = require("../validators/userSchemas");
const useCases = __importStar(require("../useCases/userUseCases"));
async function createUser(req, res) {
    const data = userSchemas_1.createUserSchema.parse(req.body);
    const user = await useCases.createUser(data);
    return res.status(201).json(user);
}
async function listUsers(_req, res) {
    const users = await useCases.listUsers();
    return res.status(200).json(users);
}
async function getUserById(req, res) {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente" });
    const user = await useCases.getUserById(id);
    if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(user);
}
async function updateUser(req, res) {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente " });
    const data = userSchemas_1.updateUserSchema.parse(req.body);
    const user = await useCases.updateUser(id, data);
    return res.status(200).json(user);
}
async function removeUser(req, res) {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente " });
    await useCases.deleteUser(id);
    return res.status(204).send();
}
