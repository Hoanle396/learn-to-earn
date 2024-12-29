import { API_URL } from "@/constants";
import axios from "axios";
import type { AxiosError } from "axios";

const request = axios.create({
	baseURL: API_URL,
});

request.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("token");
		console.log(token);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
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
