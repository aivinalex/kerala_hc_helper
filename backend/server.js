import buildApp from "./app.js";
import { cleanupCron } from "./cronJobs/caselistCacheRemoveCron.js";

const app = buildApp();
cleanupCron(app.fileStore);

const startServer = async function () {
  try {
    await app.listen({ port: process.env.PORT ?? 3000, host: "0.0.0.0" });
    app.log.info("Server running at port 3000");
  } catch (err) {
    app.log.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

startServer();
