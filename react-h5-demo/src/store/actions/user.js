import { login, logout, getInfo } from "@/api/common";
import { setToken, removeToken } from "@/utils/config";
import avatarPhoto from '@/assets/common/1.jpg'

export const setUserInfo = (userInfo) => {
  return {
    type: 'USER_SET_USER_INFO',
    userInfo,
  };
};

export const tologin = (loginData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    login(loginData)
      .then((res) => {
        if(res.code !== 10000) {
          resolve(res);
        }
        // test
        res.data.token = 'zzc'
        setToken(res.data.token)
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const togetInfo = () =>  async (dispatch) => {
  let res = await getInfo()

  if(res.code === 10000) {
    res.data.avatar = avatarPhoto;
    dispatch(setUserInfo(res.data));
    return res  
  }
  // return new Promise((resolve, reject) => {
  //   getInfo()
  //     .then((res) => {
  //       // test
  //       res.data.avatar = avatarPhoto;
  //       dispatch(setUserInfo(res.data));
  //       resolve(res);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
};

export const tologout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    logout()
      .then((res) => {
        dispatch(setUserInfo(''));
        removeToken();
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
