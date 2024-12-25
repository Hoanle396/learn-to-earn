import client from '../client';

export const getActivePools = async (params: any) => {
  return await client.get('ranking/active', { params });
};

export const getPool = (id: number) => {
  return client.get('ranking/' + id);
};
