import client from '../client';
import { Course } from './type';

export const courses = async (params: any): Promise<Course[]> => {
  return client({
    url: '/courses',
    method: 'GET',
    params,
  });
};

export const course = async (id: string): Promise<Course> => {
  return client({
    url: `/courses/${id}`,
    method: 'GET',
  });
};

export const subscribe = async (id: string): Promise<void> => {
  return client({
    url: `/courses/subscribe/${id}`,
    method: 'POST',
  });
};

export const learn = async ({ id, percent }: { id: string; percent: number }): Promise<void> => {
  return client({
    url: `/courses/learn/${id}`,
    method: 'POST',
    data: { percent },
  });
};
export const myCourses = async (params: any): Promise<Course[]> => {
  return client({
    url: '/courses/my-course',
    method: 'GET',
    params,
  });
};

export const myCourseById = async (id: string): Promise<Course[]> => {
  return client({
    url: '/courses/my-course/' + id,
    method: 'GET',
  });
};
