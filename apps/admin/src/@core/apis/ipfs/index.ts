import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import request from "./axios";

export const useMutationPinFileToIPFS = (options?: Omit<UseMutationOptions<any>, "mutationFn"> | undefined) => {
  return useMutation({ mutationFn: pinFileToIPFS, ...options })
}

export const useMutationPinJsonToIPFS = (options?: Omit<UseMutationOptions<any>, "mutationFn"> | undefined) => {
  return useMutation({ mutationFn: pinJsonToIPFS, ...options })
}

export const pinJsonToIPFS = async (data: any) => {
  return await request.post("/pinJsonIpfs", data);
}

export const pinFileToIPFS = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  return await request.post("/pinIpfs", formData);
}
