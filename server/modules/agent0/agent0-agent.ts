import { streamText, tool } from "ai";
import ky from "ky";
import { z } from "zod";

import { openai } from "@ai-sdk/openai";

import { Message } from "./agent0-types.js";

async function getUserInfo(token: string) {
  try {
    const response = await ky
      .get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
    return { result: JSON.stringify(response) };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return { error: "Failed to retrieve user information" };
  }
}

export async function agent0(messages: Message[], token: string) {
  const getUserInfoTool = tool({
    description: "Get information about the logged in user",
    parameters: z.object({}),
    execute: async () => await getUserInfo(token),
  });

  const stream = streamText({
    model: openai("gpt-4-turbo"),
    maxSteps: 5,
    tools: {
      getUserInfo: getUserInfoTool,
    },
    system: "assistant",
    messages: messages,
  });

  return stream;
}
