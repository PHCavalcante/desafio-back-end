import type { Request, Response } from "express"
import { CreateTaskSchema, updateTaskSchema } from "../validators/taskSchemas"
import * as useCases from "../useCases/taskUseCases";

export const createTask = async (req:Request, res:Response) => {
    const data = CreateTaskSchema.parse(req.body);
    const task = await useCases.createTask(data);
    return res.status(201).json(task);
}

export const listTasks = async (req:Request, res:Response) => {
    const tasks = await useCases.listTasks();
    return res.json(tasks);
}

export const getTaskById = async (req:Request, res:Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente "});
    const task = await useCases.getTaskById(id);
    if(!task) return res.status(404).json({ error: "Task não econtrada" });
}

export const updateTask = async (req:Request, res:Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente "});
    const data = updateTaskSchema.parse(req.body);
    const task = await useCases.updateTask(id, data);
    return res.json(task);
}

export const removeTask = async (req:Request, res:Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente "});
    await useCases.deleteTask(id);
    return res.status(204).send();
}