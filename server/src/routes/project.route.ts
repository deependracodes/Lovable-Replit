import { Router } from "express";

import {
  createProjectHandler,
  getProject,
  listProjects,
} from "../controllers/project.controller";

import {
  listProjectMessages,
  createProjectMessage,
} from "../controllers/message.controller";

import { validateBody, validateParams } from "../middlewares/validators";

import {
  createMessageBodySchema,
  createProjectBodySchema,
  idParamsSchema,
} from "../middlewares/schemas";

export const projectRouter = Router();

projectRouter.get("/", listProjects);
projectRouter.post(
  "/",
  validateBody(createProjectBodySchema),
  createProjectHandler,
);
projectRouter.get(
  "/:id/messages",
  validateParams(idParamsSchema),
  listProjectMessages,
);
projectRouter.post(
  "/:id/messages",
  validateParams(idParamsSchema),
  validateBody(createMessageBodySchema),
  createProjectMessage,
);
projectRouter.get("/:id", validateParams(idParamsSchema), getProject);
