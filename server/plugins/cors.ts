import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

import fastifyCors from "@fastify/cors";

export default fastifyPlugin(
  async (fastify: FastifyInstance) => {
    await fastify.register(fastifyCors, {
      origin: fastify.config.ALLOWED_ORIGINS,
      allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
      credentials: true,
    });
  },
  { name: "cors", dependencies: ["config"] }
);
