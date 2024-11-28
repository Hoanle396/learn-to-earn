import { useQuery, type UseQueryOptions } from "react-query";
import type { ILoginResponse } from "./type";
import { secret } from "./request";

export const useUser = (option?: UseQueryOptions<ILoginResponse, Error>) => {
	const { data, ...rest } = useQuery<ILoginResponse, Error>(["/me"], secret, {
		...option,
	});
	return { user: data, ...rest, isLogin: !!data };
};
