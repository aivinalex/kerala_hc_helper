import { test } from "node:test";
import assert from "node:assert";
import Fastify from "fastify";

import { advocateRoutes } from "../routes/apiRoutes.js";

test("GET advocates returns results", async () => {
  const fastify = Fastify();

  await fastify.register(advocateRoutes);

  const response = await fastify.inject({
    method: "GET",
    url: "/advocates?",
  });
  console.log(response.body);
  assert.equal(response.statusCode, 200);
});
