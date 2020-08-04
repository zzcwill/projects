import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { tologin } from "@/store/actions";

const Login = (props) => {
  const { form, tologin, history } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);

  const handleLogin = (userName, password) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    tologin(userName, password)
      .then((data) => {
        history.push('/');
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      // 检验成功
      if (!err) {
        const { userName, password } = values;
        handleLogin(userName, password);
      } else {
        console.log("检验失败!");
      }
    });
  };

  return (
    <DocumentTitle title={"用户登录"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>用户登录</h2>
          </div>
          <Spin spinning={loading} tip="登录中...">
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
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { tologin })(withRouter(WrapLogin));
