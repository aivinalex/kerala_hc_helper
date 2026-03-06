"use strict";
import { advocateSearch } from "../services/AdvocateServices.js";
import { causelistSearch } from "../services/causeListService.js";
import { advocateSearchSchema } from "../schemas/advocateSchema.js";

export async function advocateRoutes(fastify) {
  fastify.get("/advocates", advocateSearchSchema, async (req, reply) => {
    const { name } = req.query;

    try {
      const data = await advocateSearch(name);
      if (!data || data.length === 0) throw new Error("Advocate Not Found");
      console.log(data);
      return {
        count: data.length,
        results: data,
      };
    } catch (err) {
      reply.code(404).send({
        success: false,
        message: "Advocate not found",
        code: "NO_ACCESS",
      });
    }
  });
}

export const causeListRoute = async function (fastify) {
  fastify.post("/causelist", async (req, reply) => {
    try {
      const { advocates, date } = req.body;

      const data = await causelistSearch(advocates, date);
      return { results: data };
    } catch (err) {
      reply.code(502).send({
        success: false,
        message: "Causelist not found",
        code: "NO_ACCESS",
      });
    }
  });
};
