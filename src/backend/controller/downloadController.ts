import { FastifyRequest, FastifyReply } from "fastify";
type Params = {
  id: string;
};
import { CauselistCache } from "../../types/appTypes.js";

import { createPDFv2 } from "../services/pdfMakeService.js";

export async function downloadPdf(
  req: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
): Promise<void> {
  const id = req.params.id;
  const file = req.server.fileStore.get(id) as CauselistCache | null;

  if (!file) {
    throw req.server.httpErrors.notFound(
      "Session expired. Please search again.",
    );
  }

  if (!file.data.causelist)
    throw req.server.httpErrors.notFound(
      "Session expired. Please search again.",
    );

  try {
    const pdf = await createPDFv2(file.data);

    reply
      .type("application/pdf")
      .header("Content-Disposition", `attachment; filename=${id}.pdf`)
      .send(pdf);
  } catch (error) {
    req.log.error(error);

    throw req.server.httpErrors.internalServerError("Failed to generate PDF");
  }
}
