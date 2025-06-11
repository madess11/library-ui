import axios from "axios";
import type { Change } from "../types/openlibrary";


export async function fetchRecentChanges(limit = 10, offset = 0): Promise<Change[]> {
  const res = await axios.get(
    `https://openlibrary.org/recentchanges.json?limit=${limit}&bot=false`
  );

  return res.data.filter(
    (item: Change) =>
      (item.kind === "edit" || item.kind === "update") &&
      item.data?.title &&
      item.data?.key?.startsWith("/works/")
  );
}
