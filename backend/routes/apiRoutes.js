"use strict";
import advocateSearchSchema from "../schemas/advocateSchema.js";
import advocateController from "../controller/advocateController.js";
import causelistControler from "../controller/causelistContoller.js";

export async function advocateRoutes(fastify) {
  fastify.get("/advocates", advocateSearchSchema, advocateController);
}

export async function causeListRoute(fastify) {
  fastify.post("/causelist", causelistControler);
}
