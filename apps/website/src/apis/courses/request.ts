import client from "../client"
import { Course } from "./type"

export const courses = async (): Promise<Course[]> => {
  return client({
    url: "/courses",
    method: "GET"
  })
}

export const course = async (id: string): Promise<Course> => {
  return client({
    url: `/courses/${id}`,
    method: "GET"
  })
}


export const subscribe = async (id: string): Promise<void> => {
  return client({
    url: `/courses/subscribe/${id}`,
    method: "POST"
  })
}

export const learn = async ({ id, percent }: { id: string, percent: number }): Promise<void> => {
  return client({
    url: `/courses/learn/${id}`,
    method: "POST",
    data: { percent }
  })
}
