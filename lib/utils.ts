import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import OpenAI from "openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getWeather = (location: string) => {
  // choose a random temperature and condition
  const randomTemperature = Math.floor(Math.random() * 15) + 10;
  const randomConditionIndex = Math.floor(Math.random() * 5);
  const conditions = ["Cloudy", "Sunny", "Rainy", "Snowy", "Windy"];

  return {
    location: location,
    temperature: randomTemperature,
    unit: "C",
    conditions: conditions[randomConditionIndex],
  };
};

const getVectorStore = async () => {
  const openai = new OpenAI();
  const assistantId = process.env.OPENAI_ASSISTANT_ID;

  if (!assistantId) {
    throw new Error("OPENAI_ASSISTANT_ID env variable is not set");
  }

  const assistant = await openai.beta.assistants.retrieve(assistantId);

  // if the assistant already has a vector store, return its id
  if (
    assistant.tool_resources?.file_search?.vector_store_ids?.length &&
    assistant.tool_resources.file_search.vector_store_ids.length > 0
  ) {
    return assistant.tool_resources.file_search.vector_store_ids[0];
  }

  // otherwise, create a new vector store and attach it to the assistant
  const vectorStore = await openai.beta.vectorStores.create({
    name: "assistant-vector-store",
  });

  await openai.beta.assistants.update(assistantId, {
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStore.id],
      },
    },
  });

  return vectorStore.id;
};

export { getWeather, getVectorStore };
