<template>
    <div class="waitBind">
        <div class="search bg-white h40 flex align-items-c pt5 pb5 pl5 pr5">
            <img class="h18 absolute left10" src="../../assets/images/search.png" alt="">
            <input type="text" placeholder="请输入客户姓名进行搜索" v-model="customerName" class="pl35 fs14 searchBox Wpercent100 h30">
            <div class="h30 absolute right15 flex align-items-c fs15" @click="search">搜索</div>
            <!-- <img class="h16 absolute right15" src="../../assets/images/close.png" alt=""> -->
        </div>
        <div class="userList" ref="userList" @scroll="scroll">
            <div class="userItem border-b border-t mb10 fs14 bg-white pt10 pb10 pl15 pr15" v-for="item in data">
                <div class="flex justify-content-sb align-items-c">
                    <div class="flex fs14 align-items-c">
                        <div class="mr5">{{item.customerName}}</div>
                        <img v-if="item.sex == 1"  class="h18" src="../../assets/images/man.png" alt="">
                        <img v-else class="h18" src="../../assets/images/woman.png" alt="">
                    </div>
                    <div class="flex align-items-c">
                        <a :href="'tel:'+item.mobilePhone" class="flex align-items-c">
                            <div class="mr5">{{item.mobilePhone}}</div>
                            <img class="h24" src="../../assets/images/singPhone.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="flex">
                    <div>身份证：</div><div>{{item.cardNo}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getToBeBindingCustomer } from "@/api/Api";
export default {
  data() {
    return {
      data: [],
      customerName: "",
      page: 1,
      pageSize: 10,
      over: false,
      canScroll: true
    };
  },
  created() {
    let _this = this;
    if (this.$route.query["Auth-Id"] != undefined) {
      sessionStorage.setItem("authId", this.$route.query["Auth-Id"]);
    }
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      getToBeBindingCustomer({
        customerName: this.customerName,
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 10000) {
          if (res.data && res.data.length > 0) {
            _this.data = _this.data.concat(res.data);
            if (res.data.length < _this.pageSize) {
              _this.over = true;
            }
          }
        }
        _this.canScroll = true;
      });
    },
    search() {
      this.over = false;
      this.data = [];
      this.page = 1;
      this.getList();
    },
    scroll() {
      if (!this.canScroll) {
        return;
      }
      let scrollHeight = this.$refs.userList.scrollHeight;
      let scrollTop = this.$refs.userList.scrollTop;
      let clientHeight = this.$refs.userList.clientHeight;
      if (scrollHeight - clientHeight - scrollTop < 20) {
        this.page = this.page + 1;
        this.canScroll = false;
        if (!this.over) {
          this.getList();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.waitBind {
  height: 100%;
}
.searchBox {
  border: none;
  border-radius: 30px;
  outline: none;
  background: #eee;
}
.userItem {
  letter-spacing: 0.6px;
}
.userList {
  overflow-y: scroll;
  height: 627px;
}
</style>
