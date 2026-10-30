import { Client, Connection } from "@temporalio/client";
import { env } from "../config/env";
import { retryWithExponentialBackoff } from "../utils/retry";

export async function connect(): Promise<Client> {
  return retryWithExponentialBackoff(async () => {
    const connection = await Connection.connect({
      address: env.TEMPORAL_ADDRESS,
    });

    return new Client({
      connection,
      namespace: env.TEMPORAL_NAMESPACE,
    });
  }, { label: "Temporal client connect" });
}
