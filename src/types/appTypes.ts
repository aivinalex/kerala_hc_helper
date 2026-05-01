export interface CauselistCache {
  data: Response;
  timestamp: number;
  expireTime: number;
}
export interface Response {
  causelist: ListItem[];
  noListAdvocate: string[];
}
export interface ListItem {
  itemNo: string;
  items: string;
  courtHall: string;
  benchName: string;
  list: string;
  caseNo: string;
  parties: string;
}
export interface AdvocateCaseList {
  advocate: string;
  caselist: ListItem[] | null;
  success: boolean;
}

export type FileStore = Map<string, CauselistCache>;
