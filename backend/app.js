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

export default function buildApp() {
  const app = Fastify({ logger: true });

  app.register(sensible);
  app.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
  });

  app.register(advocateRoutes, { prefix: "/api" });
  app.register(causeListRoute, { prefix: "/api" });
  app.register(statusCheckRoute);

  app.setErrorHandler(errorHandler);

  return app;
}
