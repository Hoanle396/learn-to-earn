import { useQuery } from "@tanstack/react-query"
import { Pagination } from "../ranking"
import { getCategories, getCategory } from "./request"

export const useCategories = (params?: Pagination) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(params)
  })
}

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id)
  })
}
