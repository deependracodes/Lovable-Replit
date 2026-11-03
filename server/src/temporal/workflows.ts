import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";
import {
  CodeAgentInput,
  createAgentBasePayload,
  emptyPipelineState,
  WorkflowAgentMessage,
  WorkflowPipelineState,
} from "./workflow-types";
import { extractMustFixForBuilder } from "./review-parse";

//1. test ping workflow - one workflow can have multiple activities
// export async function pingWorkflow(name:string) : Promise<string> {
//     return `Hello ${name}`;
// }


const {
 createSandbox
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "15 minutes",
  retry: {
    maximumAttempts: 3,
  },
});

const {
  saveResult,
  generateResponse,
  generateTitle,
  loadMessages,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "15 minutes",
  retry: {
    maximumAttempts: 3,
  },
});


const {
  runPlannerActivity,
  runDesignerActivity,
  runBuilderActivity,
  runReviewerActivity,
  finalizePlanActivity
} = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 minutes",
  heartbeatTimeout: "30 seconds",
  retry: {
    maximumAttempts: 3,
  },
});

const REVIEW_FIX_ROUNDS = 3;


export async function codeAgentWorkflow(input: CodeAgentInput) {
  // const sandboxId = await createSandbox(input.projectId);

  // E2B provision + bootstrap (npm deps, compile script). Agent file ops key off projectId.
  await createSandbox(input.projectId);
  const previousMessages = await loadMessages(input.projectId);

  const thread =
    previousMessages.length > 0
      ? [...previousMessages]
      : [
          {
            role: "user",
            content: input.prompt,
          },
        ];

  let state: WorkflowPipelineState = emptyPipelineState(
    thread as WorkflowAgentMessage[],
  );

  // running the planner activity to generate todos and update the state
  state = await runPlannerActivity(createAgentBasePayload(input, state));
  state = await runDesignerActivity(createAgentBasePayload(input, state));
   state = await runBuilderActivity({
    ...createAgentBasePayload(input, state),
    task: "Build the full React + Tailwind app from the design document and complete every build-phase step in the planner checklist.",
  });

    for (let round = 0; round < REVIEW_FIX_ROUNDS; round++) {
    state = await runReviewerActivity(createAgentBasePayload(input, state));
    const mustFix = extractMustFixForBuilder(state.review);
    if (!mustFix) {
      break;
    }
    state = await runBuilderActivity({
      ...createAgentBasePayload(input, state),
      task: `Fix the following MUST FIX items from code review. Only change what is required.\n\n${mustFix}`,
      fixPass: true,
    });
  }

  state = await finalizePlanActivity(createAgentBasePayload(input, state));

  
  const sample_summary = "A custom React app tailored to create TODO list app";
  const title = await generateTitle(sample_summary);
  const resposne = await generateResponse(sample_summary);
  await saveResult({
    projectId: input.projectId,
    title: title,
    content: resposne,
    files: {
      "src/App.tsx": `
        export default function App(){
          return <h1>Place holder for generated app</h1>
        }
      `,
    },
    sandboxUrl: `/api/v1/preview/${input.projectId}`,
  });

  return {
    files: null,
  };
}
