import { useMutation, UseMutationOptions } from "react-query";
import request from "./axios";

export const useMutationPinFileToIPFS = (options?: Omit<UseMutationOptions<any>, "mutationFn"> | undefined) => {
  return useMutation(pinFileToIPFS, { ...options })
}

export const useMutationPinJsonToIPFS = (options?: Omit<UseMutationOptions<any>, "mutationFn"> | undefined) => {
  return useMutation(pinJsonToIPFS, { ...options })
}

export const pinJsonToIPFS = async (data: any) => {
  return await request.post("/pinJsonIpfs", data);
}

export const pinFileToIPFS = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  return await request.post("/pinIpfs", formData);
}
