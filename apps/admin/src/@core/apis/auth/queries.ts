import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ILoginResponse } from "./type";
import { secret } from "./request";

export const useUser = (option?: UseQueryOptions<ILoginResponse, Error>) => {
	const { data, ...rest } = useQuery<ILoginResponse, Error>({
		queryKey: ["/me"],
		queryFn: secret,
		...option,
	});
	return { user: data, ...rest, isLogin: !!data };
};
