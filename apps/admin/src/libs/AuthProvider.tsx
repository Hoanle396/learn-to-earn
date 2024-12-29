"use client";
import { type ILoginResponse, useUser } from "@/@core/apis/auth";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
	children,
}) => {
	const { updateFullName, updateIsLogin } = useAuthStore((state) => state);
	const { push } = useRouter();
	const { user, isLoading } = useUser();
	useEffect(() => {
		if (isLoading) return;
		if (user) {
			updateFullName(user?.data?.admin.fullName ?? "");
			updateIsLogin(!!user);
		} else if (!user) {
			localStorage.removeItem("token");
			updateFullName("");
			updateIsLogin(false);
			push("/login");
		}
	}, [user, isLoading])
	return <>{children}</>;
};

export default AuthProvider;
