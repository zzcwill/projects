
<template>
	<!-- 页面公共头部，左中右三行，可隐藏右侧菜单栏，有些页面不适用 -->
  <div class="common-header fs14 c-333">
    <x-header :left-options="{backText: ''}">
			{{title}}
			<a v-if="right" slot="right" @click="showToast = !showToast"><img class="w20" src="@/assets/images/wap/icon_menu.png"/></a>
		</x-header>

		 <div>
      <nav-list :showToast="showToast"></nav-list>
    </div>

  </div>
</template>

<script>
import { XHeader } from "vux";
import NavList from "./NavList";
export default {
  name: "home",
  props: {
    title: {
      type: String,
      default: "首页"
    },
    right: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showToast: false
    };
  },

  components: {
    XHeader,
    NavList
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="less">
.common-header {
  .vux-header {
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    .vux-header-title {
      color: #333;
    }
    .vux-header-left .left-arrow:before {
      border: 1px solid #f00;
      border-width: 1px 0 0 1px;
    }
    .vux-header-right {
      top: 13px;
    }
  }
  .dialog {
    .weui-mask {
      display: none;
      // opacity: 0;
    }
    .weui-dialog {
      display: block;
      width: auto;
      height: auto;
      position: absolute;
      top: 43px;
      right: 6px;
      bottom: auto;
      left: auto;
      background: transparent;
      overflow: visible;
    }
    .dialog-content {
      .trangle {
        width: 0;
        height: 0;
        border-width: 0 8px 10px;
        border-style: solid;
        border-color: transparent transparent #fff;
        // left: 63px;
        top: -10px;
        right: 13px;
      }
      .content {
        border-radius: 8px;
        box-shadow: 0 0 10px 3px #ddd;
      }
    }
  }
}
</style>
