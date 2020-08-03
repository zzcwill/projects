import { setUserToken, resetUser } from "./user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken } from "@/utils/auth";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: username.trim(), password: password })
      .then((response) => {
        const { data } = response;
        const token = data.token;
        dispatch(setUserToken(token));
        setToken(token);
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
        dispatch(resetUser());
        removeToken();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
