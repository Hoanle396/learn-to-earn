import { ABI, CONTRACT_ADDRESS } from "@/libs/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Address } from "viem";
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
    confirmations: 4,
  });

  const publish = ({ poolId, answers }: any) => {
    writeContract({
      args: [poolId, answers], // get salt from backend
      abi: ABI,
      functionName: 'submitAnswer',
      address: CONTRACT_ADDRESS as Address,
    });
  };

  useEffect(() => {
    if (!isErrorCreateCollection || !errorCreateCollection) return;
    toast.error(errorCreateCollection.message);
  }, [errorCreateCollection, isErrorCreateCollection]);

  useEffect(() => {
    if (!isTransactionError || !transactionError) return;
    toast.error(transactionError.message);
  }, [transactionError, isTransactionError]);

  const isLoading = isTransactionLoading || isPendingCreateCollection;

  return {
    publish,
    isLoading,
    isTransactionSuccess,
  };

};

export default useSubmit;
