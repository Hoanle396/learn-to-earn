import { Storage } from '@/libs/constants';
import { getLocalStore } from '@/libs/utils';
import { create } from 'zustand';

export type Answers = {
  answers: string[];
  poolId: string;
};

const initState: Answers = {
  answers: [],
  poolId: '',
};

export const useAnswersStore = create<any>((set) => ({
  ...initState,
  setAnswers: (answer: string) => set((state: any) => ({ ...state, answers: [...state.answers, answer] })),
  setPool: (pool: string) => set((state: any) => ({ ...state, poolId: pool })),
  clear: () =>
    set((state: any) => ({
      ...state,
      ...initState,
    })),
}));
