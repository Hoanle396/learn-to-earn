import request from "../axios";
import { Pagination } from "../ranking";
import { PayloadCreateCategory } from "./type";

export const createCategory = async (payload: PayloadCreateCategory) => {
  return await request.post("/categories", payload);
}

export const getCategories = async (params?: Pagination) => {
  return await request.get("/categories", {
    params
  });
}

export const getCategory = async (id: string) => {
  return await request.get(`/categories/${id}`);
}

export const updateCategory = async (id: string, payload: PayloadCreateCategory) => {
  return await request.put(`/categories/${id}`, payload);
}

export const deleteCategory = async (id: string) => {
  return await request.delete(`/categories/${id}`);
}
