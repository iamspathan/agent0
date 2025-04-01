import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import fastifyAuth0Api from "@auth0/auth0-fastify-api";

import config from "./config.js";
import cors from "./cors.js";
import sensible from "./sensible.js";

export default fastifyPlugin(async (fastify: FastifyInstance) => {
  await Promise.all([fastify.register(config), fastify.register(sensible)]);
  await Promise.all([
    fastify.register(fastifyAuth0Api, {
      domain: process.env.AUTH0_DOMAIN || "",
      audience: process.env.AUTH0_AUDIENCE || "",
    }),
  ]);
  await Promise.all([fastify.register(cors)]);
});
