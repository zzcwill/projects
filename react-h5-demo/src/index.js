import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// 让网页根据设备dpr和宽度，利用viewport和html根元素的font-size配合rem来适配不同尺寸的移动端设备
import '@/utils/flexible.js'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import "antd/dist/antd.less";
import "@/styles/index.less";

// 更改.env.development的REACT_APP_BASE_API为 mock即可mock数据
import { mockXHR } from './mock'
if (process.env.REACT_APP_BASE_API === '/mock') {
  mockXHR()
}

ReactDOM.render(<App />, document.getElementById("root"));
