<template>
  <div class="UserLogin">
    <div class="title">
      角色：
    </div>
    <div class="content">
      <ul  v-for="(item, index) in companyRoleArrData" :key='item.time'>
        <li>
          <choose-component :optionArrData='company' :valueData='item.depart' :disabledData='isfirstFliter(item.isfirst)' 
          :indexData='index' :indexData2='0' v-on:callBack='getCompany'></choose-component>
        </li>        
        <li>
          <choose-component :optionArrData='role' :valueData='item.roles' :disabledData='isfirstFliter(item.isfirst)' :indexData='index' :indexData2='1' v-on:callBack='getRole'></choose-component>
        </li>
        <li>
          <choose-component :optionArrData='isCan' :valueData='item.isfirst' :indexData='index' :indexData2='2' v-on:callBack='getIsfirst'></choose-component>
        </li>  
        <li>
          <button @click="addFn()">+</button>
        </li>   
        <li>
          <button @click="reduceFn()">-</button>
        </li>          
      </ul>
    </div>
  </div>
</template>

<script>
import { topicsApi } from '@/api/user'
import ChooseComponent from '@/components/Choose.vue'

export default {
  name: 'UserLogin',
  components: {
    ChooseComponent
  },
  metaInfo: {
    title: '用户绑定',
    meta: [
      {
        name: 'keywords',
        content: '公司'
      }
    ]
  },
  data() {
    return {
      company: ['101','102','103'],
      role:['201','202','203','204'],
      isCan: ['0','1'],
      companyRoleArrData:[]
    }
  },
  created() {
    //数据初始化方法
    this.judgeUserIsBind()
  },
  mounted() {
	},
  destoryed() {

  },
  methods: {
    async judgeUserIsBind() {
      let data = {
        page: 1,
        tab: 'good',
        limit: 10,  
      }
      let res = await topicsApi(data)
      res = [
        {
            depart:'101',
            roles:'201',
            isfirst:'1'
        },
        {
            depart:'102',
            //roles:'202,203,204',
            roles:'202',
            isfirst:'0'
        },
      ]

      this.companyRoleArrData = res;
    }, 
    isfirstFliter(data) {
      if(data === '1') {
        return true;
      }
      return false
    },
    getCompany(key,key2,data) {
      let arr = this.companyRoleArrData;
      let arr2 = ['depart','roles','isfirst']
      arr[key][arr2[key2]] = data;
      this.companyRoleArrData = arr;

      this.showData();
    },
    getRole(key,key2,data) {
      let arr = this.companyRoleArrData;
      let arr2 = ['depart','roles','isfirst']
      arr[key][arr2[key2]] = data;
      this.companyRoleArrData = arr;

      this.showData();
    },
    getIsfirst(key,key2,data) {
      let arr = this.companyRoleArrData;
      let arr2 = ['depart','roles','isfirst']
      arr[key][arr2[key2]] = data;
      this.companyRoleArrData = arr;

      this.showData();
    },
    addFn() {
      let arr = this.companyRoleArrData;
      let data = {
          depart:'',
          roles:'',
          isfirst:''
      }
      arr.push(data)
      this.companyRoleArrData = arr;

      this.showData();
    },
    reduceFn() {
      let arr = this.companyRoleArrData;
      arr.splice(arr.length-1,1);
      this.companyRoleArrData = arr;  
      
      this.showData();
    },
    showData() {
      console.info(this.companyRoleArrData)
    }   
  }
}
</script>

<style lang="less">
.UserLogin{
  margin: 50px auto;
  width: 400px;
  height: 1000px;
}
.title{
  float: left
}
.content{
  float: right;
}
.content ul{
  height: 100px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;  
}
.content ul li{
  margin-left: 10px;
  list-style: none;
  float: left;
  width: 60px;
}
.content ul li button{
  display: inline-block;
  width: 30px;
  height: 20px;
  border: 1px solid #eee;
}
</style>
