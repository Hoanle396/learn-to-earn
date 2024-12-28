import { useMutation, useQuery } from "@tanstack/react-query"
import { createCourse, createLesson, deleteCourse, getCourse, getCourses } from "./request"

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse
  })
}

export const useCourses = (params?: any) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(params)
  })
}

export const useCourse = (id: number) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourse(id)
  })
}

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse
  })
}


export const useCreateLesson = () => {
  return useMutation({
    mutationFn: createLesson
  })
}
