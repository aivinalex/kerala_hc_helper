import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const PdfPrinter = require("pdfmake");
const fonts = {
    Roboto: {
        normal: path.resolve(__dirname, "../../assets/fonts/Roboto-Regular.ttf"),
        bold: path.resolve(__dirname, "../../assets/fonts/Roboto-Medium.ttf"),
    },
};
const printer = new PdfPrinter(fonts);
export async function createPDFv2(data) {
    const headerRow = [
        {
            text: "Sl. No",
            alignment: "center",
        },
        {
            text: "Case No",
            alignment: "center",
        },
        {
            text: "Case Name",
            alignment: "center",
        },
        {
            text: "Stage",
            alignment: "center",
        },
        {
            text: "Bench",
            alignment: "center",
        },
        {
            text: "Court",
            alignment: "center",
        },
        {
            text: "Item",
            alignment: "center",
        },
    ];
    const body = [headerRow];
    data.causelist.forEach((el, index) => {
        body.push([
            {
                text: String(index + 1),
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
            {
                text: el.caseNo || "",
                alignment: "center",
                noWrap: true,
                margin: [0, 6, 0, 6],
            },
            {
                text: el.parties || "",
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
            {
                text: el.list || "",
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
            {
                text: el.benchName || "",
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
            {
                text: el.courtHall || "",
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
            {
                text: `Item ${el.itemNo}\n${el.items || ""}`,
                alignment: "center",
                margin: [0, 6, 0, 6],
            },
        ]);
    });
    const table = {
        table: {
            headerRows: 1,
            dontBreakRows: true,
            widths: [35, 100, "*", 55, 80, 35, 50],
            body,
        },
        layout: {
            fillColor: (rowIndex) => {
                return rowIndex === 0 ? "#eaeaea" : null;
            },
            hLineWidth: () => 0.8,
            vLineWidth: () => 0.8,
            paddingTop: () => 4,
            paddingBottom: () => 4,
            paddingLeft: () => 3,
            paddingRight: () => 3,
        },
    };
    const docDefinition = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [15, 20, 15, 20],
        content: [
            {
                text: "Cause List",
                style: "header",
            },
            table,
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                alignment: "center",
                margin: [0, 0, 0, 12],
            },
        },
        defaultStyle: {
            fontSize: 9,
        },
    };
    return new Promise((resolve, reject) => {
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks = [];
        pdfDoc.on("data", (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        pdfDoc.on("error", (err) => {
            reject(err);
        });
        pdfDoc.end();
    });
}
