
<template>
	<!-- 页面公共头部，左中右三行，可隐藏右侧菜单栏，有些页面不适用 -->
  <div class="header-nav-list fs14 c-333">
      <x-dialog v-model="showToast" class="dialog" :hide-on-blur="true">
        <div class="dialog-content relative">
            <div class="trangle absolute"></div>
            <div class="content bg-white" v-if="menuList.length > 0">
                <div class="flex h40 align-items-c item border-b" v-for="item in menuList" @click="toNativeUrl(item.navurl,item.openmode)" :key=item.id>
                    <img :src="item.iconpath" alt="" class="w20 h20 ml12">
                    <span class="ml10 mr10">{{item.navname}}</span>
                </div>
            </div>
        </div>
      </x-dialog>
    <!--   <div class="nav-bg" v-if="showToast" @click="showToast = !showToast"></div> -->
  </div>
</template>

<script>
import { XHeader, XDialog } from "vux";
export default {
  name: "home",
  props: {
    showToast: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuList: []
    };
  },

  components: {
    XHeader,
    XDialog
  },
  methods: {
    toNativeUrl(path, openmode) {
      if (openmode == 1) {
        /*1跳转，2打开新窗口*/
        if (window.location.href == path) {
          location.reload();
        } else {
          window.location.href = path;
        }
      } else {
        window.open(path, "_blank");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="less">
.header-nav-list {
  .nav-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0px;
    left: 0px;
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
        box-shadow: 0 0 10px 1px #ddd;
        .item:nth-last-of-type(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
