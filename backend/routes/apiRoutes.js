"use strict";
import advocateSearchSchema from "../schemas/advocateSchema.js";
import advocateController from "../controller/advocateController.js";
import causelistController from "../controller/causelistContoller.js";

export async function advocateRoutes(fastify) {
  fastify.get("/advocates", advocateSearchSchema, advocateController);
}

export async function causeListRoute(fastify) {
  fastify.post("/causelist", causelistController);
}
export async function statusCheckRoute(fastify) {
  fastify.get("/status", async (req, reply) => {
    return reply.send({
      status: "ok",
      // eslint-disable-next-line no-undef
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
}
