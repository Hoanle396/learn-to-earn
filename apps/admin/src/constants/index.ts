export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x12090353e9D09F3cecd97159Af175DEdb6BA6beD";

export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
export const IPFS_URL = process.env.NEXT_PUBLIC_IPFS_URL || "http://localhost:5002";
export const IPFS_KEY = process.env.NEXT_PUBLIC_IPFS_KEY || "123456789";

export const IPFS = (hash: string) => `${IPFS_URL}/${hash}`
