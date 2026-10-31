import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";


//1. test ping workflow - one workflow can have multiple activities
// export async function pingWorkflow(name:string) : Promise<string> {
//     return `Hello ${name}`;
// }


const { createSandbox , saveResult } = proxyActivities<typeof activities>({
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
  
    

}