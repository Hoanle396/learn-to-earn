import client from '../client';
import { ILoginPayload, ILoginResponse, IRegisterPayload, IResponse, IUpdateWalletPayload, IUser } from './type';

export const login = async (data: ILoginPayload): Promise<IResponse<ILoginResponse>> => {
  return client({
    url: '/auth/login',
    method: 'POST',
    data,
  });
};

export const logout = async (): Promise<void> => {
  return client({
    url: '/auth/logout',
    method: 'POST',
  });
};

export const register = async (data: IRegisterPayload): Promise<IResponse<ILoginResponse>> => {
  return client({
    url: '/auth/register',
    method: 'POST',
    data,
  });
};

export const refreshToken = async (): Promise<IResponse<ILoginResponse>> => {
  return client({
    url: '/auth/refresh-token',
    method: 'POST',
  });
};

export const me = async (): Promise<IUser> => {
  return client({
    url: '/auth/me',
    method: 'GET',
  });
};

export const updateWallet = async (data: IUpdateWalletPayload): Promise<IUser> => {
  return client({
    url: '/auth/update-address',
    method: 'POST',
    data,
  });
};
