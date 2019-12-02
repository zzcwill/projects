<template>
    <div class="ruleCenter">
        <div class="bindRule bg-white">
            <div class="bindRule_title h40 fs14 flex align-items-c pl15 border-b border-t">
                {{data.wechatBindRuleTitle}}
            </div>
            <div class="bindRule_middle fs14 pl15 pr15 pt10 pb10">
                {{data.wechatBindRuleContent}}
            </div>
            <div class="bindRule_footer relative flex Wpercent100 pl15 fs14 pb10">
                <div class="Wpercent50 flex">
                    <div class="w90">绑定总数：</div>
                    <div>{{data.bindNum}}</div>
                </div>
                <div class="Wpercent50 flex">
                    <div class="w90">有效绑定：</div>
                    <div>{{data.bindValueNum}}</div>
                </div>
                <div class="Wpercent50 flex">
                    <div class="w90">有效绑定率：</div>
                    <div>{{data.bindValueRate}}</div>
                </div>
                <div class="Wpercent50 flex">
                    <div class="w90">待绑定客户：</div>
                    <div class="c-red canJump" @click="jumpWait">{{data.noBindNum}}</div>
                </div>
            </div>
        </div>
        <div class="payRule bg-white mt20">
            <div class="payRule_title h40 fs14 flex align-items-c pl15 border-b border-t">
                {{data.paymentApplyTitle}}
            </div>
            <div class="payRule_middle fs14 pl15 pr15 pt10 pb10" v-html="data.paymentApplyContent">
            </div>
            <div class="payRule_footer relative flex Wpercent100 pl15 fs14 pb10">
                <div class="Wpercent50 flex">
                    <div class="w90">抵押超期：</div>
                    <div class="c-red canJump" @click="jumpWarn">{{data.pledgeOverDueCount}}</div>
                </div>
                <div class="Wpercent50 flex">
                    <div class="w90">垫款超期：</div>
                    <div class="c-red canJump" @click="jumpWarn">{{data.payOverDueCount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getRuleCenterData } from "@/api/Api";
export default {
  data() {
    return {
      data: {
        bindNum: "",
        bindValueNum: "",
        bindValueRate: "",
        toBeBindingCustomerCount: "",
        noBindNum: "",
        pledgeOverDueCount: "",
        payOverDueCount: "",
        wechatBindRuleTitle: "",
        wechatBindRuleContent: "",
        paymentApplyContent: "",
        paymentApplyTitle: ""
      }
    };
  },
  created() {
    if (this.$route.query["Auth-Id"] != undefined) {
      sessionStorage.setItem("authId", this.$route.query["Auth-Id"]);
    }
    getRuleCenterData().then(res => {
      if (res.code == 10000) {
        this.data = res.data;
      }
    });
  },
  methods: {
    jumpWait() {
      // this.$router.push({
      //   path: "/waitBind",
      //   query: {
      //     "Auth-Id": sessionStorage.getItem("authId")
      //   }
      // });
      if (this.$route.query["Auth-Id"] != undefined) {
        sessionStorage.setItem("authId", this.$route.query["Auth-Id"]);
      }
      window.appNative.open(
        JSON.stringify({
          url:
            window.location.origin +
            "/waitBind?Auth-Id=" +
            sessionStorage.getItem("authId"),
          title: "待绑定客户"
        })
      );
    },
    jumpWarn() {
      window.appNative.openWarnPage();
    }
  }
};
</script>
<style lang="less" scoped>
.bindRule_middle,
.payRule_middle {
  letter-spacing: 0.8px;
}
.bindRule_footer,
.payRule_footer {
  flex-wrap: wrap;
}
.canJump {
  text-decoration: underline;
}
</style>
