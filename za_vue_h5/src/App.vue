<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import cookie from "@/assets/js/common";
export default {
  name: "app",
  meta: [
    {
      // set meta
      name: "home",
      content: "",
      title: ""
    }
  ],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  watch: {
    $route(to, from) {}
  },
  created() {}
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "../src/assets/less/common.less";
</style>
