/* eslint-disable no-undef */
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import {
  advocateRoutes,
  causeListRoute,
  statusCheckRoute,
} from "./routes/apiRoutes.js";
import sensible from "@fastify/sensible";
import errorHandler from "./helpers/errorHandler.js";

const app = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
});
app.register(statusCheckRoute);
app.setErrorHandler(errorHandler);
app.register(advocateRoutes, { prefix: "/api" });
app.register(causeListRoute, { prefix: "/api" });
app.register(sensible);
try {
  await app.listen({ port: 3000, host: "0.0.0.0" });
  app.log.info("Server running at port 3000");
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
