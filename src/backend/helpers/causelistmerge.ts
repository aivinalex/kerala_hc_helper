interface AdvocateEntry {
  advocate: string;
  caselist: ListItem[] | null;
  success: boolean;
}

interface ListItem {
  itemNo: string;
  items: string;
  courtHall: string;
  benchName: string;
  list: string;
  caseNo: string;
  parties: string;
}

type CauseList = AdvocateEntry[];

interface Response {
  causelist: ListItem[];
  noListAdvocate: string[];
}

export const mergedcauselist = function (data: CauseList): Response {
  {
    const seen = new Set();
    const mergedList = data.reduce<Response>(
      (acc, current) => {
        if (current.caselist) {
          for (const value of current.caselist) {
            const combinedKey =
              `${value.itemNo}-${value.courtHall}`.toLowerCase();
            if (!seen.has(combinedKey)) {
              seen.add(combinedKey);
              acc.causelist.push(value);
            }
          }
        } else acc.noListAdvocate.push(current.advocate);

        return acc;
      },
      { causelist: [], noListAdvocate: [] },
    );

    mergedList.causelist.sort((itemA, ItemB) => {
      const primary = itemA.courtHall.localeCompare(ItemB.courtHall, "en", {
        numeric: true,
      });
      if (primary !== 0) return primary;
      return Number(itemA.itemNo) - Number(ItemB.itemNo);
    });

    return mergedList;
  }
};
