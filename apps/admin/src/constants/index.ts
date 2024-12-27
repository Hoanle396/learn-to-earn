export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x1b13e1d43d79b0d711f8DdDEF2B47Fba9E16429c";

export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
export const IPFS_URL = process.env.NEXT_PUBLIC_IPFS_URL || "http://localhost:5002";
export const IPFS_KEY = process.env.NEXT_PUBLIC_IPFS_KEY || "123456789";

export const IPFS = (hash: string) => `${IPFS_URL}/${hash}`
