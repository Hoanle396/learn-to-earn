import { CONTRACT_ADDRESS } from "@/constants";
import { ABI } from "@/constants/abi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import dayjs from "dayjs";

const usePublish = () => {
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

  const publish = ({ name, startDate, endDate, questions, passed }: any) => {
    writeContract({
      args: [name, dayjs(startDate), dayjs(endDate), questions, passed],
      abi: ABI,
      functionName: 'createPool',
      address: CONTRACT_ADDRESS as Address,
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

export default usePublish;
