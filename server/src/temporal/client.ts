import { Client, Connection } from "@temporalio/client";
import { env } from "../config/env";
import { retryWithExponentialBackoff } from "../utils/retry";
import { CodeAgentInput, codeAgentWorkflow } from "./workflows";

// 3. connect to temporal server
export async function connect(): Promise<Client> {
  return retryWithExponentialBackoff(
    async () => {
      const connection = await Connection.connect({
        address: env.TEMPORAL_ADDRESS,
      });

      return new Client({
        connection,
        namespace: env.TEMPORAL_NAMESPACE,
      });
    },
    { label: "Temporal client connect" },
  );
}


export async function startCodeAgent(
  input: CodeAgentInput,
): Promise<Awaited<ReturnType<typeof codeAgentWorkflow>>> {
  const client = await connect();

  const handle = await client.workflow.start(codeAgentWorkflow, {
    taskQueue: env.TEMPORAL_TASK_QUEUE,
    workflowId: `code-agent-${input.projectId}-${Date.now()}`,
    args: [input],
  });

  return handle.result();
}


/* test
export async function startPing(name:string) : Promise<string> {
    
  const client = await connect();

  const handle = await client.workflow.start(
    pingWorkflow, {
      taskQueue: env.TEMPORAL_TASK_QUEUE,
      workflowId : `ping-${Date.now()}`,
      args : [name]
    }
  )

  return handle.result();
}


async function main() : Promise<void> {
   const name = process.argv[2] ?? "Deep";
   const result = await startPing(name)
   console.log('ping workflow result' , result)
}


if (require.main == module) {
  console.log("triggering");
  main()
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.log("temporal error", e);
      process.exit(1);
    });
}
  */
