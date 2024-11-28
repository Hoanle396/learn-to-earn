import { create } from "zustand";

type State = {
	fullname: string;
	isLogin: boolean;
};

type Action = {
	updateFullName: (fullname: State["fullname"]) => void;
	updateIsLogin: (isLogin: State["isLogin"]) => void;
};

const useAuthStore = create<State & Action>((set) => ({
	fullname: "",
	isLogin: false,
	updateFullName: (fullname) => set(() => ({ fullname: fullname })),
	updateIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
}));
export default useAuthStore;
