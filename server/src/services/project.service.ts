import type { Project } from "../../generated/prisma/client";
import {
  
  findAllProjects,
  
} from "../repositories/project.repository";


export async function getAllProjects(): Promise<Project[]> {
  return findAllProjects();
}
