"use client";

// React Imports
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Type Imports
import type { Mode } from "@core/types";

import Illustrations from "@components/Illustrations";
// Component Imports
import Logo from "@components/layout/shared/Logo";

// Config Imports
import themeConfig from "@configs/themeConfig";

import { login } from "@/@core/apis/auth";
import useAuthStore from "@/stores/auth";
// Hook Imports
import { useImageVariant } from "@core/hooks/useImageVariant";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import {
	GoogleLogin,
	type GoogleLoginResponse,
	type GoogleLoginResponseOffline,
} from "react-google-login";

const Login = ({ mode }: { mode: Mode }) => {
	const { updateFullName, updateIsLogin } = useAuthStore((state) => state);
	const { mutate } = useMutation({
		mutationFn: login,
		onSuccess: ({ data }) => {
			console.log(data);
			updateFullName(data?.admin.fullName ?? "");
			updateIsLogin(!!data);

			localStorage.setItem("token", data?.tokens.accessToken);
			router.push("/");
			toast.success("Login successful");
		},
		onError: async () => {
			localStorage.removeItem("token");
			updateFullName("");
			updateIsLogin(false);
			toast.error("Invalid credentials");
		},
	});

	// Vars
	const darkImg = "/images/pages/auth-v1-mask-dark.png";
	const lightImg = "/images/pages/auth-v1-mask-light.png";

	// Hooks
	const router = useRouter();
	const authBackground = useImageVariant(mode, lightImg, darkImg);

	useEffect(() => {
		gapi.load("client:auth2", () => {
			gapi.client.init({
				clientId:
					"970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com",
				scope: "email",
			});
		});
	}, []);


	const responseGoogle = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline,
	) => {
		if ("accessToken" in response) {
			mutate({ accessToken: response.accessToken });
		} else toast.error("Login failed");
	};

	return (
		<div className="flex flex-col justify-center items-center min-bs-[100dvh] relative p-6">
			<Card className="flex flex-col sm:is-[450px]">
				<CardContent className="p-6 sm:!p-12">
					<Link href="/" className="flex justify-center items-center mbe-6">
						<Logo />
					</Link>
					<div className="flex flex-col gap-5">
						<div>
							<Typography variant="h4">{`Welcome to ${themeConfig.templateName}!👋🏻`}</Typography>
							<Typography className="mbs-1">
								Please sign-in to your account and start the adventure
							</Typography>
						</div>

						<GoogleLogin
							clientId="970416655854-lshvdvota7og26upes5tij7n9vslke8g.apps.googleusercontent.com"
							buttonText="Log in with Google"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={"single_host_origin"}
						/>
					</div>
				</CardContent>
			</Card>
			<Illustrations maskImg={{ src: authBackground }} />
		</div>
	);
};

export default Login;
