export enum OnchainStatus {
  CONFIRMING = 'confirming',
  CONFIRMED = 'confirmed',
}
export enum BorrowerTransactionStatus {
  COMPLETED = 'COMPLETED',
}

export enum TokenStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REQUEST = 'request',
}

export enum ItemConfigStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REQUEST = 'request',
}

export enum TokenSymbolEnum {
  USDC = 'USDC',
  USDT = 'USDT',
  BTC = 'BTC',
}

export enum TransactionActionType {
  BUY = 'buy',
  SELL = 'sell',
  BID = 'bid',
  LIST = 'list_nft',
  CANCEL_LIST = 'cancel_list_nft',
  CANCEL_BID = 'cancel_bid',
  ACCEPT_BID = 'accept_bid',
}
