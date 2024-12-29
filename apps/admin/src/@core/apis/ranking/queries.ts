import { useMutation, useQuery } from "@tanstack/react-query";
import { createRanking, downloadTemplate, getJoinedRanking, getRanking, getRankingDetail, uploadQuestions } from "./request";
import type { Pagination } from "./types";

export const useRankingList = (params: Pagination) => {
  return useQuery({
    queryKey: ["ranking", params],
    queryFn: () => getRanking(params),
  });
};

export const useTemplate = () => {
  return useMutation({
    mutationFn: downloadTemplate,
  });
}

export const useCreateRanking = () => {
  return useMutation({
    mutationFn: createRanking,
  })
}

export const useRankingDetail = (id: number) => {
  return useQuery({
    queryKey: ["ranking-detail", id],
    queryFn: () => getRankingDetail(id),
  })
}

export const useUploadQuestions = () => {
  return useMutation({
    mutationFn: uploadQuestions,
  })
}

export const useJoinedRanking = (id: number) => {
  return useQuery({
    queryKey: ["joined-ranking", id],
    queryFn: () => getJoinedRanking(id),
  })
}
