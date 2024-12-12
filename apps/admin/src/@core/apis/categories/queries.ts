import { useQuery } from "@tanstack/react-query"
import { Pagination } from "../ranking"
import { getCategories } from "./request"

export const useCategories = (params?: Pagination) => {
  return useQuery(["categories"], () => getCategories(params)
  )
}
