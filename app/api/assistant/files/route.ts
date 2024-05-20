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

// list files in assistant's vector store
export async function GET() {
  const vectorStoreId = await getVectorStore();
  const fileList = await openai.beta.vectorStores.files.list(vectorStoreId);

  const filesArray = await Promise.all(
    fileList.data.map(async file => {
      const fileDetails = await openai.files.retrieve(file.id);
      const vectorFileDetails = await openai.beta.vectorStores.files.retrieve(
        vectorStoreId,
        file.id
      );
      return {
        file_id: file.id,
        filename: fileDetails.filename,
        status: vectorFileDetails.status,
      };
    })
  );
  return Response.json(filesArray);
}
