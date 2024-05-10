import { AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const input: {
    threadId: string;
    message: string;
  } = await req.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.OPENAI_ASSISTANT_ID ??
          (() => {
            throw new Error("OPENAI_ASSISTANT_ID variable is not set");
          })(),
      });

      const runResult = await forwardStream(runStream);
    }
  );
}
