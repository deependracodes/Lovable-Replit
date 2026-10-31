import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";


//1. test ping workflow - one workflow can have multiple activities
// export async function pingWorkflow(name:string) : Promise<string> {
//     return `Hello ${name}`;
// }


const { createSandbox , saveResult,generateResponse,generateTitle } = proxyActivities<typeof activities>({
  startToCloseTimeout: "15 minutes",
  retry: {
    maximumAttempts: 3,
  },
});


export interface CodeAgentInput {
  projectId:string,
  prompt : string
}

export async function codeAgentWorkflow(input: CodeAgentInput) {
  
  await createSandbox(input.projectId);

  const sample_summary = "A custom React app tailored to create TODO list app"
  const  title = await generateTitle(sample_summary);
  const resposne = await generateResponse(sample_summary)
   await saveResult({
    projectId : input.projectId,
    title : title,
    content : resposne,
    files: {
      "src/App.tsx" : `
        export default function App(){
          return <h1>Place holder for generated app</h1>
        }
      `
    },
    sandboxUrl : `/api/v1/preview/${input.projectId}`
  })
    
  return {
    files : null
  }

}