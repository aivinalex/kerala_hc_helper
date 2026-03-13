import { causelistSearch } from "../services/causeListService.js";

export default async function causelistControler(req, reply) {
  const { advocates, date } = req.body;
  console.log(advocates);

  const data = await causelistSearch(advocates, date);
  if (data) {
    return { results: data };
  } else throw new Error(" causelist not found");
}
