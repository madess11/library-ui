export type Change = {
  id: string;
  kind: string;
  timestamp: string;
  comment?: string;
  author?: { key?: string };
  data?: {
    title?: string;
    key?: string;
    covers?: number[];
  };
};
