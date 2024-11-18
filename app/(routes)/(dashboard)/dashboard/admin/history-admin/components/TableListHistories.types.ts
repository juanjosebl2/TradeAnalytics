import { History, Strategy, HistoryParam, Param } from "@prisma/client";

export type HistoryWithStrategy = History & {
  strategy: Strategy | null; 
  modifiedParams: (HistoryParam & { param: Param | null })[]; 
};

export type TableListHistoriesProps = {
  histories: HistoryWithStrategy[];
};
