import * as usersController from "../controllers/usersController";
import * as tasksController from "../controllers/tasksController";
import { Router } from "express";

const routes = Router();
    routes.post("/users", usersController.createUser);
    routes.get("/users", usersController.listUsers);
    routes.get("/users/:id", usersController.getUserById);
    routes.put("/users/:id", usersController.updateUser);
    routes.delete("/users/:id", usersController.removeUser);

    routes.post("/tasks", tasksController.createTask);
    routes.get("/tasks", tasksController.listTasks);
    routes.get("/tasks/:id", tasksController.getTaskById);
    routes.put("/tasks/:id", tasksController.updateTask);
    routes.delete("/tasks/:id", tasksController.removeTask);

    routes.get("/ping", (_req, res) => {
        res.status(200).send("pong!");
    });

export default routes;
