import { advocateSearch } from "../services/advocateServices.js";

// eslint-disable-next-line no-unused-vars
export default async function advocateController(req, reply) {
  const { name } = req.query;

  const data = await advocateSearch(name);
  if (!data?.length) {
    throw req.server.httpErrors.notFound("Advocate not found");
  }

  return {
    count: data.length,
    results: data,
  };
}
