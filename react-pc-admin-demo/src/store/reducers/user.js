import * as types from "../action-types";
const initUserInfo = {
  userInfo: ''
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      };
    default:
      return state;
  }
}
