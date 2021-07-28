import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getToken } from "@/utils/config";
import "./index.less";
import { tologin, tologout, togetInfo } from "@/store/actions";

const Login = (props) => {
  const { tologin, tologout, togetInfo, history } = props;

  const handleLogin = async () => {
    // 登录完成后 发送请求 调用接口获取用户信息
    let loginData = {
      userName: '15777777777',
      password: '123456aa'
    }
    let data = await tologin(loginData)
    if(data.code === 10000) {
      handleInfo()
    }
  };

  const handleLogout = () => {
    tologout().then((data) => {
      console.info(data)
    })
  };



  const handleInfo = async () => {
    let data = await togetInfo()

    history.push('/dashboard');
  };  

  // const autoJump = () => {
  //   let token = getToken();
  //   if (token) {
  //     history.push('/dashboard');
  //   }
  // }
  // autoJump()

  return (
    <div className="login-container">
      <div onClick={handleLogin}>login</div>
      <br />
      <div onClick={handleLogout}>tologout</div>
    </div>
  );
};

export default withRouter(
  connect((state) => state.user, { tologin, tologout, togetInfo })(Login)
);
