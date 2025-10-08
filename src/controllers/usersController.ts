import type { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../validators/userSchemas"
import * as useCases from "../useCases/userUseCases";

export async function createUser(req: Request, res: Response) {
    const data = createUserSchema.parse(req.body);
    const user = await useCases.createUser(data);
    return res.status(201).json(user);
}

export async function listUsers(_req: Request, res: Response) {
    const users = await useCases.listUsers();
    return res.status(200).json(users);
}

export async function  getUserById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente" })
    const user = await useCases.getUserById(id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(200).json(user);
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente "});
    const data = updateUserSchema.parse(req.body);
    const user = await useCases.updateUser(id, data);
    return res.status(200).json(user);
}

export async function removeUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id inválido ou ausente "});
    await useCases.deleteUser(id);
    return res.status(204).send();
}