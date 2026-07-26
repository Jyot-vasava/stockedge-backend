import { Router } from "express";
import { exampleController } from "./example.controller.js";

export const exampleRouter = Router();

exampleRouter.get("/example", exampleController);
