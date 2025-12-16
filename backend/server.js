import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const app = fastify({ logger: true }); // creating server insatnce

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"), // creeating a subunstace
});

app.get("/", async (request, reply) => {
  return reply.sendFile("index.html");
});

try {
  await app.listen({ port: 3000 });
  app.log.info("server running at port :3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
