import request from "../axios";

export const createCourse = (data: any) => {
  return request({
    url: "/courses",
    method: "POST",
    data,
  });
}

export const getCourses = (params: any) => {
  return request({
    url: "/courses",
    method: "GET",
    params,
  });
}

export const getCourse = (id: number) => {
  return request({
    url: `/courses/${id}`,
    method: "GET",
  });
}

export const deleteCourse = (id: number) => {
  return request({
    url: `/courses/${id}`,
    method: "DELETE",
  });
}
