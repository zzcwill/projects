import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "@/utils/config";
import "./index.less";
import { tologin } from "@/store/actions";

const Login = (props) => {
  const { tologin, history } = props;

  // const handleLogin = (loginData) => {
  //   // 登录完成后 发送请求 调用接口获取用户信息
  //   tologin(loginData)
  //     .then(() => {
  //       history.push('/dashboard');
  //     })
  // };

  const autoJump = () => {
    let token = getToken();
    if (token) {
      history.push('/dashboard');
    }
  }
  autoJump()

  return (
    <div className="login-container">
      login
    </div>
  );
};

export default withRouter(
  connect((state) => state.user, { tologin })(Login)
);
