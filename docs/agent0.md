![Agent0](/client/public/agent0.svg "Agent0 Logo")

## What is Agent0

Agent0 is a full stack demo app built using Auth0, React, Fastify & OpenAI to showcase an **AI agent with 1st Party Tool calling** where the backend API and the Tool share the same API audience.

This is a way to demonstrate authenticated tool calling on behalf of the logged in user without giving any direct permissions to the AI agent and the underlying LLM itself.

## How does it work

![sequence](/docs/sequence.png)

In this example, we are using [Auth0 React SDK](https://github.com/auth0/auth0-react) to login the end user on the React web application (our AI chat interface). This establishes the user session on the browser while keeping the backend API service completely stateless.

The Fastify API server is built with [Auth0 Fastify SDK](https://github.com/auth0/auth0-fastify) to secure the `/server/agent0` endpoint and only allows logged in users to be able to interact with it.

When the user logs in, Auth0 requests for an Access Token with audience `agent0-api` on behalf of the user which is then presented by the browser to the API server every time the user interacts with the chat interface and submits a prompt.

The AI agent setup on the API server has a Tool defined (`getUserInfo`) that interacts with Auth0 and can share details about a logged in user but requires a valid Access Token. The way this is setup, the API server extracts the Access Token from browser requests and makes it available for the Tool, allowing the LLM to do the Tool call on behalf of the logged in user without having direct access to the token.

## Agent0 Features

This sample demo cover:
- Signup / Login / Logout Experience
- Protected API for agent interactions
- First party Tool calling (get-user-info)
- Contextualized chat interactions
- Streamed responses from backend API
- Saved chat history
- UI theming (Light or Dark mode)

## Learn about Auth0's Auth for GenAI

To learn more about Auth0's Auth for GenAI visit [https://auth0.com/ai](https://auth0.com/ai)
