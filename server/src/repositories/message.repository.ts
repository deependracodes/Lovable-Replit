import {
  MessageRole,
  MessageType,
  type Message,
} from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { CreateMessageInput } from "../utils/types";

export async function findMessagesByProjectId(
  projectId: string,
): Promise<Message[]> {
  return prisma.message.findMany({
    where: {
      projectId,
    },
    orderBy: { createdAt: "asc" },
    include: {
      fragments: true,
    },
  });
}


export async function createMessage(
  input: CreateMessageInput,
): Promise<Message> {
  return prisma.message.create({
    data: {
      projectId: input.projectId,
      content: input.content,
      role: MessageRole.USER,
      type: MessageType.RESULT,
    },
  });
}
