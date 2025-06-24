import { create } from "zustand";
import type { TUser } from "../types/userTypes";

type UserStore = {
  user: TUser | null;
  login: (userData: TUser) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  login: (userData) => {
    set(() => ({ user: userData }));
  },
  logout: () => {
    set(() => ({ user: null }));
  },
}));
