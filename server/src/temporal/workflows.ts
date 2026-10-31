import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";


//1. test ping workflow - one workflow can have multiple activities
// export async function pingWorkflow(name:string) : Promise<string> {
//     return `Hello ${name}`;
// }


const { createSandbox } = proxyActivities<typeof activities>({
  startToCloseTimeout: "15 minutes",
  retry: {
    maximumAttempts: 3,
  },
});