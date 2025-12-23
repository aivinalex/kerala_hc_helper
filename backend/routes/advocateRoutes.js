"use strict";
import { advocateSearch } from "../services/AdvocateServices.js";

export default async function advocateRoutes(fastify) {
  fastify.get("/advocates", async (req, reply) => {
    const { name } = req.query;

    try {
      const data = await advocateSearch(name);
      return {
        count: data.length,
        results: data,
      };
    } catch (err) {
      reply.code(502).send({ error: "Court service unavailable" });
    }
  });
}
