<template>
  <div class="container">
    <div class="nav" v-if="this.navShow">
      <x-header :left-options="{backText: ''}">{{title}}</x-header>
    </div>
    <iframe style="display:block" id="i-iframe" scrolling=auto :src="url"></iframe>
  </div>
</template>

<script>
import { XHeader } from "vux";

export default {
  name: "h5Page",
  data() {
    return {
      url: "",
      title: "",
      navShow: true
    };
  },
  components: {
    XHeader
  },
  metaInfo: {
    title: ""
  },
  methods: {},
  mounted() {
    const oIframe = document.getElementById("i-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
  },
  created() {
    this.url = decodeURIComponent(this.$route.query.url);
    this.title = this.$route.query.title;
    this.navShow = this.$route.query.navShow;
  }
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";

.container {
  height: 100%;

  .nav {
    position: relative;
    border-bottom: 1px solid #f1f1f1;

    .vux-header {
      background: #fff;
    }

    /deep/ .vux-header .vux-header-title {
      color: #333333;
      font-size: 18px;
    }

    /deep/ .vux-header .vux-header-left .left-arrow:before {
      border-color: black;
      border-width: 2px 0 0 2px;
    }

    /deep/ .vux-header-back {
      color: black;
    }
  }
}
</style>
