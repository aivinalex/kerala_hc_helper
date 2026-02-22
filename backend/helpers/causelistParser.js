import * as cheerio from "cheerio";

export const parseCauseList = function (data) {
  const $ = cheerio.load(data);
  const caseDetail = [];
  $(" table tbody tr").each((_i, row) => {
    const col = $(row).find("td");
    console.log(col);
    const itemNo = $(col[0]).find("strong").text().trim();
    const items = $(col[0])
      .clone()
      .find("strong")
      .remove()
      .end()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    const courtHall = $(col[1]).text().trim();
    const benchRaw = $(col[2]).text().trim();
    const benchName = benchRaw.replace(/^\d+\s*-\s*/, "").trim();

    const list = $(col[3]).text().trim();
    const caseNo = $(col[4]).text().trim();
    const partiesraw = $(col[5]).text().trim();
    const parties = partiesraw
      .replace(/(.+?)vs(.+)/i, (_, p1, p2) => `${p1.trim()} vs ${p2.trim()}`)
      .replace(/\s+/g, " ")
      .trim();

    caseDetail.push({
      itemNo,
      items,
      courtHall,
      benchName,
      list,
      caseNo,
      parties,
    });
  });
  console.log(caseDetail);
  return caseDetail;
};
