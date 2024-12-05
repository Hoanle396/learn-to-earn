import request from "../axios";
import type { CreatePoolPayLoad, Pagination, QuestionPayload } from "./types";

export const getRanking = async (params: Pagination) => {
  return request.get("/ranking", {
    params,
  });
};

export const getRankingDetail = async (id: number) => {
  return request.get(`/ranking/${id}`);
};

export const createRanking = async (data: CreatePoolPayLoad) => {
  return request.post("/ranking", data);
};

export const downloadTemplate = async () => {
  return request.get("/ranking/template", {
    responseType: "blob",
  });
};

export const uploadQuestions = async (data: QuestionPayload) => {
  return request.post("/ranking/question", data);
};
