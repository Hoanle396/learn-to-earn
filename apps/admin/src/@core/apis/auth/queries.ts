import { useMutation, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { ILoginResponse } from "./type";
import { getUsers, secret, updateUser } from "./request";

export const useUser = (option?: UseQueryOptions<ILoginResponse, Error>) => {
	const { data, ...rest } = useQuery<ILoginResponse, Error>({
		queryKey: ["/me"],
		queryFn: secret,
		...option,
	});
	return { user: data, ...rest, isLogin: !!data };
};

export const useUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	})
}

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: updateUser
	})
}
