import { create } from 'zustand';

type User = {
  _id: string;
  name: string;
  email: string;
} | null;

type UserState = {
  user: User;
  token: string | null;
  login: (userData: {_id:string, name: string; email: string }, token: string) => void;
  logout: () => void;

};

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  login: (userData, token) => set({ user: userData, token }),
  logout: () => set({ user: null, token: null }),
 
}));

export default useUserStore;
