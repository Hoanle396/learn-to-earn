import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { course, courses, learn, myCourses, subscribe } from "./request"

export const useCourses = (params: any, options?: Partial<UseQueryOptions<any, any>>) => {
  return useQuery<any, any>({
    queryKey: ["courses"],
    queryFn: () => courses(params),
    ...options
  })
}

export const useCourseById = (id: string, options?: Partial<UseQueryOptions<any, any>>) => {
  return useQuery<any, any>({
    queryKey: ["course", id],
    queryFn: () => course(id),
    ...options
  })
}

export const useMyCourses = (params: any, options?: Partial<UseQueryOptions<any, any>>) => {
  return useQuery<any, any>({
    queryKey: ["my-courses"],
    queryFn: () => myCourses(params),
    ...options
  })
}

export const useSubscribe = () => {
  return useMutation({
    mutationFn: subscribe
  })
}

export const useLearn = () => {
  return useMutation({
    mutationFn: learn
  })
}
