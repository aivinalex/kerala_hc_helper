import { Response } from "../../types/appTypes.js";
import puppeteer, { Browser, Page } from "puppeteer";
import { createHtml } from "../helpers/createHtmlForPDF.js";

let browser: Browser | null = null;

export async function createPDF(data: Response): Promise<Buffer> {
  const browser: Browser = await createBrowser();
  const page: Page = await browser.newPage();
  try {
    const html = createHtml(data);
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = Buffer.from(
      await page.pdf({
        format: "A4",
        printBackground: true,
      }),
    );

    return pdfBuffer;
  } finally {
    await page.close();
  }
}

async function createBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    browser.on("disconnected", () => {
      console.log("Browser disconnected");
      browser = null;
    });
  }

  return browser;
}

export function getBrowserInstance(): Browser | null {
  return browser;
}
