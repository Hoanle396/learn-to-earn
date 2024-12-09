import ABI from "../contracts/LearnToEarnCertificate.sol/LearnToEarnCertificate.json"
export { ABI }
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xff31baA69db8641E60905547Ad9e0C9a6660Df4b";

export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
export const IPFS_URL = process.env.NEXT_PUBLIC_IPFS_URL || "http://localhost:5002";
export const IPFS_KEY = process.env.NEXT_PUBLIC_IPFS_KEY || "123456789";
