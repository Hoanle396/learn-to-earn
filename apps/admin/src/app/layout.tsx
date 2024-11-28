"use client";
// Third-party Imports
import "react-perfect-scrollbar/dist/css/styles.css";

// Type Imports
import type { ChildrenType } from "@core/types";

// Style Imports
import "@/app/globals.css";

// Generated Icon CSS Imports
import "@assets/iconify-icons/generated-icons.css";
import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const queryClientOption: QueryClientConfig = {
	defaultOptions: {
		queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
	},
};
const RootLayout = ({ children }: ChildrenType) => {
	// Vars
	const [queryClient] = useState(new QueryClient(queryClientOption));
	const direction = "ltr";

	return (
		<html id="__next" dir={direction} lang="en">
			<QueryClientProvider client={queryClient}>
				<body className="flex is-full min-bs-full flex-auto flex-col">
					{children}
				</body>
				<Toaster />
			</QueryClientProvider>
		</html>
	);
};

export default RootLayout;
