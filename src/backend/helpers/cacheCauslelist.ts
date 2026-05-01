import { CauselistCache, Response } from "../../types/appTypes.js";

export const cachecCauselistData = function (
  data: Response,
  fileStore: Map<string, CauselistCache>,
): string {
  const id = crypto.randomUUID();
  const TTL = 10 * 60 * 1000;
  const cacheData: CauselistCache = {
    data: data,
    timestamp: Date.now(),
    expireTime: Date.now() + TTL,
  };
  fileStore.set(id, cacheData);

  return id;
};
