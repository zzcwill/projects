import Vue from "vue";
import Router from "vue-router";

import Wap from "./wap"; /* wap页面*/

Vue.use(Router);

export default new Router({
  mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: Wap
});
