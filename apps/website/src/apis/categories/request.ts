
import client from "../client";
import { PayloadCreateCategory } from "./type";

export const createCategory = async (payload: PayloadCreateCategory) => {
  return await client.post("/categories", payload);
}

export const getCategories = async (params?: any) => {
  return await client.get("/categories", {
    params
  });
}

export const getCategory = async (id: string) => {
  return await client.get(`/categories/${id}`);
}

export const updateCategory = async (id: string, payload: PayloadCreateCategory) => {
  return await client.put(`/categories/${id}`, payload);
}

export const deleteCategory = async (id: string) => {
  return await client.delete(`/categories/${id}`);
}
