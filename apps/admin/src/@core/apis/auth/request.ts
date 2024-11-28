import request from "../axios";
import type { ILoginPayload, ILoginResponse } from "./type";

export const login = async (data: ILoginPayload) => {
	return request({
		url: "/auth/admin/login-with-google",
		method: "POST",
		data,
	});
};

export const logout = async () => {
	return request({
		url: "/auth/admin/logout",
		method: "POST",
	});
};

export const secret = async (): Promise<ILoginResponse> => {
	return request({
		url: "/admin/me",
		method: "GET",
	});
};
