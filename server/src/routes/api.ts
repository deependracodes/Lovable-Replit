import { Router } from "express";
import { healthCheck } from "../controllers/health";
import { projectRouter } from "./project.route";
import { validateParams } from "../middlewares/validators";
import { previewParamsSchema } from "../middlewares/schemas";
import { previewProject } from "../controllers/project.controller";

export const apiRouter = Router();

apiRouter.get("/health", healthCheck);


apiRouter.use("/projects", projectRouter);

apiRouter.get(
  "/preview/:projectId",
  validateParams(previewParamsSchema),
  previewProject,
);