import { createPDF } from "../services/downloadService.js";
export async function downloadPdf(req, reply) {
    const id = req.params.id;
    const file = req.server.fileStore.get(id);
    if (!file) {
        throw req.server.httpErrors.notFound("Session expired. Please search again.");
    }
    if (!file.data.causelist)
        throw req.server.httpErrors.notFound("Session expired. Please search again.");
    try {
        const pdf = await createPDF(file.data);
        reply
            .type("application/pdf")
            .header("Content-Disposition", `attachment; filename=${id}.pdf`)
            .send(pdf);
    }
    catch (error) {
        req.log.error(error);
        throw req.server.httpErrors.internalServerError("Failed to generate PDF");
    }
}
