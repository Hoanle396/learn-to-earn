import { ABI, CONTRACT_ADDRESS } from "@/libs/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Address, parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

const useSubmit = () => {
  const {
    data: dataCreateCollection,
    isError: isErrorCreateCollection,
    error: errorCreateCollection,
    isPending: isPendingCreateCollection,
    writeContract,
  } = useWriteContract();

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: dataCreateCollection,
    confirmations: 0,
  });

  const publish = ({ poolId, answers }: any) => {
    writeContract({
      args: [poolId, answers], // get salt from backend
      abi: ABI,
      functionName: 'submitAnswer',
      address: CONTRACT_ADDRESS as Address,
      value: BigInt('10000'),
      gas: BigInt(1000000),
    });
  };

  useEffect(() => {
    if (!isErrorCreateCollection || !errorCreateCollection) return;
    toast.error("Something went wrong. Please try again.");
  }, [errorCreateCollection, isErrorCreateCollection]);

  useEffect(() => {
    if (!isTransactionError || !transactionError) return;
    toast.error("Something went wrong. Please try again.");
  }, [transactionError, isTransactionError]);

  const isLoading = isTransactionLoading || isPendingCreateCollection;

  return {
    publish,
    isLoading,
    isTransactionSuccess,
  };

};

export default useSubmit;
