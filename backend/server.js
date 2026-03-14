import buildApp from "./app.js";

const app = buildApp();

const startServer = async function () {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    app.log.info("Server running at port 3000");
  } catch (err) {
    app.log.error(err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

startServer();
