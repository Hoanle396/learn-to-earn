import { useQuery } from '@tanstack/react-query';
import { getActivePools, getPool } from './request';

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
