import { proxyActivities } from "@temporalio/workflow";

import type * as activities from "./activities";


const { createSandbox } = proxyActivities<typeof activities>({
  startToCloseTimeout: "15 minutes",
  retry: {
    maximumAttempts: 3,
  },
});