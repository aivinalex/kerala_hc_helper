import { CauselistCache } from "../../types/appTypes.js";
type FileStore = Map<string, CauselistCache>;
type CleanupFn = () => void;

type CleanupFactory = (fileStore: FileStore) => CleanupFn;

export function cleanupCron(fileStore: FileStore) {
  const cleanup: CleanupFn = cleanUpFactory(fileStore);
  setInterval(cleanup, 60000);
}

const cleanUpFactory: CleanupFactory = function (fileStore: FileStore) {
  return function () {
    const currentTime = Date.now();

    for (const [id, data] of fileStore) {
      if (currentTime > data.expireTime) {
        fileStore.delete(id);
      }
    }
  };
};
