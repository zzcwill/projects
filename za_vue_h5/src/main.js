// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "./assets/js/flexible";
import router from "./router";
import Store from "./store";
require("es6-promise").polyfill();
import vuex from "vuex";
import MetaInfo from "vue-meta-info";
import { AlertPlugin, ToastPlugin, ConfirmPlugin } from "vux";
import "@/assets/js/utils/route-hooks"; // permission control

import cookie from "@/assets/js/common";

Vue.use(MetaInfo);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(cookie);
Vue.use(vuex);

router.beforeEach((to, from, next) => {
  router.onError(error => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
  });
  next();
});

new Vue({
  el: "#app",
  store: Store,
  router: router,
  render: h => h(App)
});
