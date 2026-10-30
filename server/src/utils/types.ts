export type CreateProjectWithMessageInput = {
  name: string;
  messageContent: string;
};

export type CreateMessageInput = {
  projectId: string;
  content: string;
};

export type RetryWithBackoffOptions = {
  maxAttempts?: number;
  initialBackoffMs?: number;
  label?: string;
};