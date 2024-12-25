import { Address } from 'viem';

export type ILoginPayload = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  user: IUser;
  tokens: IToken;
};

export type IUpdateWalletPayload = {
  wallet: Address;
};

export type IRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};
export type IUser = {
  id: string;
  fullName: string;
  email: string;
  wallet: string;
};
export type IToken = {
  accessToken: string;
  refreshToken: string;
};

export interface IResponse<T> {
  meta: any;
  data: T;
}
