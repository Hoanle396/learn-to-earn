import { API_URL, IPFS_KEY } from "@/constants";
import axios from "axios";
import type { AxiosError } from "axios";

const request = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = IPFS_KEY;
    return config;
  },
  (error) => Promise.reject(error),
);

const handleError = async (error: AxiosError) => {
  const data = error?.response?.data;
  return Promise.reject(data ?? error);
};

request.interceptors.response.use((response) => response.data, handleError);

export default request;
