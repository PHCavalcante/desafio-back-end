import z from "zod";

export const CreateTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    status: z.enum(["pending", "done"]).default("pending"),
    userId: z.uuid()
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    status: z.enum(["pending", "done"]).optional()
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
