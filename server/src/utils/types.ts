export type CreateProjectWithMessageInput = {
  name: string;
  messageContent: string;
};

export type CreateMessageInput = {
  projectId: string;
  content: string;
};
