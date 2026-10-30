import { Fragment, Message } from "../../generated/prisma/client";

export type CreateProjectWithMessageInput = {
  name: string;
  messageContent: string;
};

export type CreateMessageInput = {
  projectId: string;
  content: string;
};

export type MessageWithFragments = Message & { fragments: Fragment[] };

export type FileCollection = Record<string, string>; //relative path to file content

export type SandboxFileContent = {
  path: string;
  content: string;
};


export type SaveResultInput = {
  projectId: string;
  content: string;
  title: string;
  files: FileCollection;
  sandboxUrl: string;
  isError?: boolean;
};

export type RetryWithBackoffOptions = {
  maxAttempts?: number;
  initialBackoffMs?: number;
  label?: string;
};