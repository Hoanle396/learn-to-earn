import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadTemplate, getRanking } from "./request";
import type { Pagination } from "./types";

export const useRankingList = (params: Pagination) => {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: async () => getRanking(params),
  });
};

export const useTemplate = () => {
  return useMutation({
    mutationFn: downloadTemplate,
  });
}
