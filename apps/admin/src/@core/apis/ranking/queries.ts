import { useQuery } from "react-query";
import { getRanking } from "./request";
import type { Pagination } from "./types";

export const useRankingList = (params: Pagination) => {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: async () => getRanking(params),
  });
};
