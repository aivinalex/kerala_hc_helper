"use strict";

import fastify from "fastify";
import path from "path";
import fastifyStatic from "@fastify/static";

const app = fastify({ logger: true });
app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/",
});
app.get("/", async function routesHandler(request, reply) {
  try {
    return reply.sendFile("caselist.html");
  } catch (err) {
    response.code(500).send(err.message);
  }
});

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
