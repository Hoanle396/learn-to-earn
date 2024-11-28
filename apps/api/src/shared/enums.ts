export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
}

export enum AdminStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AuthEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum RarityEnum {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'legendary',
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

export enum NftStatus {
  FOR_SALE = 'FOR_SALE',
  NOT_FOR_SALE = 'NOT_FOR_SALE',
  FOR_AUCTION = 'FOR_AUCTION',
}
