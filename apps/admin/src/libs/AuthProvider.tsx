"use client";
import { type ILoginResponse, useUser } from "@/@core/apis/auth";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/navigation";
import type React from "react";

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
	children,
}) => {
	const { updateFullName, updateIsLogin } = useAuthStore((state) => state);
	const { push } = useRouter();
	useUser({
		onSuccess: (data: ILoginResponse) => {
			updateFullName(data?.data?.admin.fullName ?? "");
			updateIsLogin(!!data);
		},
		onError: async () => {
			localStorage.removeItem("token");
			updateFullName("");
			updateIsLogin(false);
			push("/login");
		},
	});
	return <>{children}</>;
};

export default AuthProvider;
