import { atom } from 'recoil';
import { nanoid } from 'nanoid';

export type User = {
  id: string;
  email: string;
  nickname: string;
  role: 'USER' | 'ADMIN';
};

export type UserState = User | undefined;

export const userState = atom<UserState>({
  key: `user/${nanoid()}`,
  default: undefined,
});
