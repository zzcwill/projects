<template>
  <div class ="container">
    <x-header title="菜单" :left-options="{showBack: false}"></x-header>
    <group title="功能列表">
      <cell title="合同签约"  is-link  @click.native="onClick"></cell>
    </group>
    <group title="退出登录">
      <cell title="退出登录" value="退出" is-link  @click.native="logoutClick"></cell>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from "vux";
import tool from "@/assets/js/business-common";

export default {
  name: "homePage",
  data() {
    return {
      menuList: ["合同签约", "H5页面", "404页面"]
    };
  },
  components: {
    XHeader,
    Group,
    Cell
  },
  methods: {
    onClick() {
      this.$router.push({
        path: "/contractSigningList",
        query: { "Auth-Id": sessionStorage.getItem("authId"), navShow: 1 }
      });
    },
    logoutClick() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";

.container {
  height: 100%;
  background-color: #e6e6e6;
}
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
