import { Message } from "@/types";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "gpt-4-turbo-2024-04-09",
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY
});



export const OpenAIStream = async (messages: Message[]) => {
  

  let inputMsg = JSON.stringify( [
    {
      role: "system",
      content: "You are a helpful, friendly, assistant."
    },
    ...messages
  ])

  // Conver to Stream.
  const parser = new StringOutputParser();
  const stream = await model.pipe(parser).stream(inputMsg);
  return stream;
};
