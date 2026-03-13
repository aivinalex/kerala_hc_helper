import { causelistSearch } from "../services/causeListService.js";

// eslint-disable-next-line no-unused-vars
export default async function causelistController(req, reply) {
  const { advocates, date } = req.body;
  if (advocates.length === 0)
    throw req.server.httpErrors.badRequest("Advocate list empty");

  if (!date) throw req.server.httpErrors.badRequest("Date missing");

  const data = await causelistSearch(advocates, date);
  if (data) {
    return { results: data };
  } else throw req.server.httpErrors.notFound("failed in fetching causelist");
}
