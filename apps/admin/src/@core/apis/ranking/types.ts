export type Ranking = {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
};

export type CreatePoolPayLoad = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  tags: string[];
  logo: string;
  price: string;
  questionPerPool: number;
};

export type QuestionPayload = {
  poolId: number;
  file: File;
};
