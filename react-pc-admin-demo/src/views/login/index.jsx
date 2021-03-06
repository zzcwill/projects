import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { getToken } from "@/utils/config";
import "./index.less";
import { tologin } from "@/store/actions";

const Login = (props) => {
  const { form, tologin, history } = props;
  const { getFieldDecorator } = form;

  const handleLogin = (loginData) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    tologin(loginData)
      .then(() => {
        history.push('/dashboard');
      })
  };

  const autoJump = () => {
    let token = getToken();
    if (token) {
      history.push('/dashboard');
    }
  }
  autoJump()

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { userName, password } = values;
        let loginData = {
          userName,
          password
        }
        handleLogin(loginData);
      } else {
        console.log("检验失败!");
      }
    });
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="content">
        <div className="title">
          <h2>用户登录</h2>
        </div>
        <Spin spinning={false} tip="登录中...">
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名",
                },
              ],
              initialValue: "18088888888", // 初始值
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "请输入密码",
                },
              ],
              initialValue: "123456a", // 初始值
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
              </Button>
          </Form.Item>
        </Spin>
      </Form>

      <div className="login-footer">
        <span>Copyright © 2019-2020 zzc-admin All Rights Reserved.</span>
      </div>       
    </div>

  );
};

const WrapLogin = Form.create()(Login);

export default withRouter(
  connect((state) => state.user, { tologin })(WrapLogin)
);
