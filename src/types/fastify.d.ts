import "fastify";
import "@fastify/sensible";

import { FileStore } from "./appTypes";

declare module "fastify" {
  interface FastifyInstance {
    fileStore: FileStore;
  }
}
export {};
