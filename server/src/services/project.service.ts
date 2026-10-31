import { generateSlug } from "random-word-slugs";
import type { Project } from "../../generated/prisma/client";
import {
  createProjectWithMessage,
  findAllProjects,
  findProjectById,
} from "../repositories/project.repository";
import { writeSandboxFiles } from "../lib/sandbox";
import { FileCollection } from "../utils/types";
import { saveResult } from "../repositories/message.repository";
import { startCodeAgent } from "../temporal/client";

// simple test for creating files in sandox
const HELLO_WORLD_FILES: FileCollection = {
  "src/App.tsx": `
  export default function App(){
    return <h1>Hello world!</h1>
  }
  `,
};
export async function getAllProjects(): Promise<Project[]> {
  return findAllProjects();
}

export async function getProjectById(id: string): Promise<Project | null> {
  return findProjectById(id);
}

export async function createProject(messageContent: string) {
  const name = generateSlug(3, { format: "kebab" });
  const project = await createProjectWithMessage({ name, messageContent });
  // test
  // await writeSandboxFiles(project.id,HELLO_WORLD_FILES)

  // test
  // await saveResult({
  //   projectId : project.id,
  //   title : "Hello world",
  //   content : "Dummy conent",
  //   files: HELLO_WORLD_FILES,
  //   sandboxUrl : `/api/v1/preview/${project.id}`
  // })

  await startCodeAgent({
    projectId : project.id,
    prompt : messageContent
  })
  return project;
}
