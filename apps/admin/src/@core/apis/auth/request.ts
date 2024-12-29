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

export const getUsers = async () => {
	return request({
		url: "/admin/users",
		method: "GET",
	});
}

export const updateUser = async (data: { id: number, status: 'active' | 'inactive' }) => {
	return request({
		url: `/admin/users/${data.id}`,
		method: "PATCH",
		data: {
			status: data.status
		},
	});
}
