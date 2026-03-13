export default async function errorHandler(error, req, reply) {
  req.log.error(error);

  if (error.validation) {
    return reply.status(400).send({ message: "Invalid Request Data" });
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }
  return reply.status(500).send({
    message: "Internal Server Error",
  });
}
