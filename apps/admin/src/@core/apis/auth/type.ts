import type { IResponse } from "@/types/common";

export interface ILoginResponse
	extends IResponse<{
		admin: Admin;
		tokens: Tokens;
	}> {}

export interface Admin {
	id: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	email: string;
	fullName: string;
	role: string;
	isActive: boolean;
}

export interface Tokens {
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
}

export interface ILoginPayload {
	accessToken: string;
}
