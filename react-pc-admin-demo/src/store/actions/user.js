import * as types from "../action-types";
import { reqUserInfo } from "@/api/user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken } from "@/utils/config";
import avatarPhoto from '@/assets/common/1.jpg'

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    userInfo,
  };
};

export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: username.trim(), password: password })
      .then((response) => {
        const { data } = response;
        setToken(data.token)
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserInfo = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo()
      .then((response) => {
        const { data } = response
        data.avatar = avatarPhoto;
        dispatch(setUserInfo(data));
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const { data } = response;
        dispatch(setUserInfo(''));
        removeToken();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
