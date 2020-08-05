import * as types from "../action-types";
import { login, logout, getInfo } from "@/api/common";
import { setToken, removeToken } from "@/utils/config";
import avatarPhoto from '@/assets/common/1.jpg'

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    userInfo,
  };
};

export const tologin = (loginData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    login(loginData)
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

export const togetInfo = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    getInfo()
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

export const tologout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    logout(token)
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
