import { getVectorStore } from "@/lib/utils";
import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";

const openai = new OpenAI();

// upload file to assistant's vector store
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Uploadable;

  if (!file) {
    throw new Error("");
  }

  const vectorStoreId = await getVectorStore();

  const openaiFile = await openai.files.create({
    file: file,
    purpose: "assistants",
  });

  await openai.beta.vectorStores.files.create(vectorStoreId, {
    file_id: openaiFile.id,
  });

  return new Response();
}
