import Mock from "mockjs";
import loginAPI from "./login";

export function mockXHR() {
	// 登录与用户相关
	Mock.mock(/\/login/, "post", loginAPI.login);
	Mock.mock(/\/logout/, "post", loginAPI.logout);
	Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);
}
