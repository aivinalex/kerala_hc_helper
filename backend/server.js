import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { advocateRoutes, causeListRoute } from "./routes/apiRoutes.js";

const app = fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
});

app.register(advocateRoutes, { prefix: "/api" });
app.register(causeListRoute, { prefix: "/api" });

app.get("/home", async (request, reply) => {
  return reply.sendFile("index.html");
});

try {
  await app.listen({ port: 3000, host: "0.0.0.0" });
  app.log.info("Server running at port 3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
