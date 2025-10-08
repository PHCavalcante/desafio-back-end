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
exports.removeTask = exports.updateTask = exports.getTaskById = exports.listTasks = exports.createTask = void 0;
const taskSchemas_1 = require("../validators/taskSchemas");
const useCases = __importStar(require("../useCases/taskUseCases"));
const createTask = async (req, res) => {
    const data = taskSchemas_1.CreateTaskSchema.parse(req.body);
    const task = await useCases.createTask(data);
    return res.status(201).json(task);
};
exports.createTask = createTask;
const listTasks = async (req, res) => {
    const tasks = await useCases.listTasks();
    return res.json(tasks);
};
exports.listTasks = listTasks;
const getTaskById = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente " });
    const task = await useCases.getTaskById(id);
    if (!task)
        return res.status(404).json({ error: "Task não econtrada" });
};
exports.getTaskById = getTaskById;
const updateTask = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente " });
    const data = taskSchemas_1.updateTaskSchema.parse(req.body);
    const task = await useCases.updateTask(id, data);
    return res.json(task);
};
exports.updateTask = updateTask;
const removeTask = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ error: "Id inválido ou ausente " });
    await useCases.deleteTask(id);
    return res.status(204).send();
};
exports.removeTask = removeTask;
