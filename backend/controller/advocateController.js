import { advocateSearch } from "../services/advocateServices.js";

export default async function advocateController(req, reply) {
  const { name } = req.query;

  const data = await advocateSearch(name);
  if (!data || data.length === 0) throw new Error("Advocate Not Found");
  console.log(data);
  return {
    count: data.length,
    results: data,
  };
}
