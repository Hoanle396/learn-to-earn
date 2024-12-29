import { useMutation, useQuery } from '@tanstack/react-query';
import { getActivePools, getCertification, getPool, joinPool } from './request';

export const usePoolActive = (params: any) => {
  return useQuery({
    queryKey: ['pool-active'],
    queryFn: () => getActivePools(params),
  });
};

export const usePoolById = (id: number) => {
  return useQuery({
    queryKey: ['pool', id],
    queryFn: () => getPool(id),
  });
};

export const useJoinPool = () => {
  return useMutation({
    mutationFn: joinPool
  })
}


export const useCertification = () => {
  return useQuery({
    queryKey: ['certification'],
    queryFn: () => getCertification(),
  });
}
