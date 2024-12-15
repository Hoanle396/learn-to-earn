import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, me, register, updateWallet } from "./request";

export const userUser = async () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: me
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  })
}


export const useUpdateWallet = () => {
  return useMutation({
    mutationFn: updateWallet
  })
}
