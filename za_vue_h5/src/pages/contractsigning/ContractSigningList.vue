<template>
  <div class="ContractSigningList">
    <div class="nav" v-if="this.navShow">
      <x-header :left-options="{backText: '返回',preventGoBack:true }" @on-click-back="customerBack()">合同签署</x-header>
    </div>
    <div class="h46 relative">
      <Search
      v-model="seachValue"
      position="absolute"
      auto-scroll-to-top
      placeholder="请输入搜索内容"
      @on-submit="onSearch"
      @on-cancel="onSearch"
      ref="search"></Search>
    </div>
    <div id="sign_box" class="pb15">
      <div class="signingList bg-white mb15" :key="item.projectId" v-for="item in signList">
        <div class="signing_header flex h40">
          <div class="signing_header_left flex justify-content-c align-items-c"> 
            <p class="fs14 ml15" style="white-space:nowrap">{{item.customerName}}</p>
            <img class="h15 ml7"  v-if="item.sex == 1" src="../../assets/images/man.png" alt="">
            <img class="h15 ml7"  v-if="item.sex == 0" src="../../assets/images/woman.png" alt="">
          </div>
          <div class="signing_header_right flex justify-content-c align-items-c">
            <a class="fs13 mr7"  :href="'tel:'+item.mobilePhone">联系电话：{{item.mobilePhone}}
                 <img class="h22 mr15" src="../../assets/images/singPhone.png" alt="">
            </a>
          </div>
        </div>
        <div class="signing_body flex">
          <div class="IDnumber flex align-items-c">
            <span class="fs14">身份证：</span>
            <div class="fs14">{{item.cardNo}}</div>
          </div>
          <div class="address flex align-items-c fs14 mt5">
            {{item.carFullDetail}}
          </div>
          <div class="priceNumber flex align-items-c mt5 relative">
            <div class="fs14"><span>开票金额：</span>{{item.billPrice}}</div>
            <div class="fs14 absolute" style="left:60%"><span>贷款金额：</span>{{item.loanAmount}}</div>
          </div>
          <div class="status flex align-items-c mt5 relative pb10">
            <div class="fs14"><span>贷款状态：</span>{{item.loanStatus | loanStatusFilters}}</div>
            <div class="fs14 absolute" style="left:60%"><span>签署状态：</span>{{item.econtractStatus | econtractStatusFilters}}</div>
          </div>
        </div>
        <div class="signing_footer relative h50 flex align-items">
          <div class="signbtn absolute mt10 right30 pt3 pb3 pl9 pr9" @click="submit(item)">开始签约</div>
        </div>
      </div>
    </div>
    <div v-show="loadMore" >
      <load-more :show-loading="tipLoading" :tip="tipContent" class="pb10 mt10 mb10"></load-more>
    </div>
  </div>
</template>

<script>
import { XHeader, Search, LoadMore } from "vux";
import {
  getEContractList,
  getEContractInstanceH5,
  getEContractStatusUpdate
} from "@/api/Api";
import { isNullOrUndefined } from "util";
export default {
  name: "contractSigningList",
  data() {
    return {
      over: false,
      loadMore: false,
      tipLoading: true,
      tipContent: "正在加载更多的数据",
      seachValue: "",
      signList: [],
      pageNumber: 1,
      pageSize: 10,
      navShow: true
    };
  },
  filters: {
    econtractStatusFilters: function(econtractStatus) {
      switch (econtractStatus) {
        case 0:
          return "未签订";
        case 1:
          return "待签订";
        case 2:
          return "已签订";
        case 3:
          return "待重签 ";
        case 4:
          return "已重签";
        default:
          return "";
      }
    },
    loanStatusFilters: function(loanStatus) {
      switch (loanStatus) {
        case 1:
          return "贷款拒绝";
        case 2:
          return "审批通过";
        case 3:
          return "贷款审核";
        case 4:
          return "贷款发起";
        case 5:
          return "贷款作废";
        case 6:
          return "贷款结清";
        default:
          return "";
      }
    }
  },
  components: {
    XHeader,
    Search,
    LoadMore
  },
  mounted() {
    if (this.$route.query["Auth-Id"] != undefined) {
      sessionStorage.setItem("authId", this.$route.query["Auth-Id"]);
    }
    if (this.$route.query["navShow"] != undefined) {
      this.navShow = this.$route.query["navShow"];
    }

    window.addEventListener("scroll", this.handleScroll);
    /**
     * 更新对应合同状态
     */
    let that = this;
    let queryProjectId = sessionStorage.getItem("projectId");
    if (queryProjectId != undefined) {
      getEContractStatusUpdate({
        projectId: queryProjectId
      })
        .then(function(res) {
          sessionStorage.removeItem("projectId");
        })
        .catch(function(err) {
          sessionStorage.removeItem("projectId");
          that.$vux.toast.text(err.message, "middle");
        });
    }
    /**
     * 获取列表
     */
    this.onSearch();
  },
  methods: {
    onSearch() {
      let that = this;
      this.pageNumber == 1;
      getEContractList({
        queryStr: this.seachValue,
        page: this.pageNumber,
        pageSize: this.pageSize
      })
        .then(function(res) {
          that.signList = [];
          if (res.data.length > 0) {
            that.signList = that.signList.concat(res.data);
          }
          if (res.data.length < that.pageSize) {
            that.over = true;
          }
        })
        .catch(function(err) {
          that.$vux.toast.text(err.message, "middle");
        });
    },
    customerBack() {
      if (window.appNative == undefined) {
        this.$router.push({
          path: "/home"
        });
      } else {
        window.appNative.back();
      }
    },
    submit(item) {
      let that = this;
      getEContractInstanceH5({
        projectId: item.projectId
      })
        .then(function(res) {
          let tempUrl = res.data.url;
          sessionStorage.setItem("projectId", item.projectId);
          // if( window.appNative == undefined) {
          that.$router.push({
            path: "/html5Page",
            query: {
              navShow: false,
              url:
                tempUrl +
                "&sucUrl=" +
                window.location.origin +
                window.location.pathname +
                "&failUrl=" +
                window.location.origin +
                window.location.pathname,
              title: "合同签署"
            }
          });
          // }else{
          //      window.appNative.open({
          //             "navHidden":1,
          //             "url":"http://114.55.55.41:86/?orderNo=vxdb000220190319143421828&assurerNo=S04026363&returnUrl=http://192.168.27.203:9003/ContractSigningList?navShow=1&Auth-Id="+ sessionStorage.getItem("authId"),
          //             "title":"合同签署"
          //      });
          // }
        })
        .catch(function(err) {
          that.$vux.toast.text(err.message, "middle");
        });
    },
    /* 滚动事件 */
    handleScroll() {
      let that = this;
      that.$nextTick(() => {
        if (document.getElementById("sign_box")) {
          let sign_box = document.getElementById("sign_box").clientHeight;
          let offsetHeight = document.body.offsetHeight;
          let scrollTop =
            document.documentElement.scrollTop + document.body.scrollTop;
          let t =
            scrollTop + 1 > sign_box + 90 - offsetHeight &&
            that.loadMore == false &&
            !that.over;
          if (t) {
            that.pageNumber++;
            that.loadMore = true;
            //请求ajax
            getEContractList({
              queryStr: that.seachValue,
              page: that.pageNumber,
              pageSize: that.pageSize
            })
              .then(function(res) {
                that.loadMore = false;
                if (res.data.length > 0) {
                  that.signList = that.signList.concat(res.data);
                }
                if (res.data.length < that.pageSize) {
                  that.over = true;
                }
              })
              .catch(function(err) {
                that.pageNumber--;
                that.loadMore = false;
                that.$vux.toast.text(err.message, "middle");
              });
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#sign_box {
  background: #eee;
}
.ContractSigningList {
  height: 100%;
}
/deep/ .vux-search-mask {
  display: none;
}
/deep/ .weui-search-bar__label {
  display: none;
}
.nav {
  position: relative;
  border-bottom: 1px solid #f1f1f1;
  .vux-header {
    background: #fff;
  }
  /deep/ .vux-header .vux-header-title {
    color: #000000;
    font-size: 18px;
  }
  /deep/ .vux-header .vux-header-left .left-arrow:before {
    border-color: #404d54;
    margin-top: 1.5px;
  }
  /deep/ .vux-header-back {
    color: #404d54;
    font-size: 16px;
  }
}
.signingList {
  width: 100%;
  .signing_header {
    flex-direction: row;
    justify-content: space-between;
  }
  .signing_header_left {
    flex-direction: row;
  }
  .signing_header_right {
    flex-direction: row;
  }
  .signing_body {
    padding-left: 15px;
    padding-right: 15px;
    flex-direction: column;
  }
  .priceNumber {
    justify-content: flex-start;
  }
  .status {
    justify-content: flex-start;
    border-bottom: 2px solid #eee;
  }
  .signbtn {
    border: 1px solid #ccc;
  }
}
</style>
