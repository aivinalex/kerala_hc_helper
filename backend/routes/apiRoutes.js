"use strict";
import { advocateSearch } from "../services/AdvocateServices.js";
import { causlistSearch } from "../services/causeListService.js";

export async function advocateRoutes(fastify) {
  const searchSchema = {
    schema: {
      query: {
        type: "object",
        required: ["name"], // This makes 'name' mandatory
        properties: {
          name: { type: "string", minLength: 3 },
        },
      },
    },
  };

  fastify.get("/advocates", searchSchema, async (req, reply) => {
    const { name } = req.query;

    try {
      const data = await advocateSearch(name);
      if (!data || data.length === 0) throw new Error("Advocate Not Found");

      return {
        count: data.length,
        results: data,
      };
    } catch (err) {
      console.log(err);
      reply.code(502).send({
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

      console.log("reached  causelist route");

      const data = await causlistSearch(advocates, date);
      return { results: data };
    } catch (err) {
      console.log(err);
      reply.code(502).send({
        success: false,
        message: "Causelist not found",
        code: "NO_ACCESS",
      });
    }
  });
};
