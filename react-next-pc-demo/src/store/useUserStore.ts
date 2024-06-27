import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type IUser = {
  id?: string;
  token?: string;
  nickName?: string;
  avatar?: string;
  mobile?: string;
};

// interface IState {
//   user: TUser;
//   update: (state: IState) => void;
//   clear: () => void;
// }

const initUser: IUser = {
  id: '',
  token: '',
  nickName: 'test',
  avatar: 'https://yytj.shop/assets/avatar.png',
  mobile: ''
};

// 用户信息
export const useUserStore = create(
  devtools(
    immer((set: any) => ({
      user: initUser,
      update: (user: IUser) =>
        set((state: any) => {
          if (user) {
            state.user = { ...state.user, ...user };
          }
        }),
      clear: () => {
        set((state: any) => {
          state.user = initUser;
        });
      }
    }))
  )
);
