<template>
  <div id="dv-container" ref="container">
    <div class="container">
      <div class="total">访客登录系统</div>

      <div class="header">
        <div class="left">请输入六位激活码</div>
        <div class="right">
          <img src="../../../assets/ytj/ewmFkjl.png" alt="">
          <span>扫码自助完成预约申请</span>
        </div>
      </div>

      <!-- 显示输入的内容 -->

      <div class="inputInfo">
        <input type="text" v-model="inputNum.one">
        <input type="text" v-model="inputNum.two">
        <input type="text" v-model="inputNum.three">
        <input type="text" v-model="inputNum.four">
        <input type="text" v-model="inputNum.five">
        <input type="text" v-model="inputNum.six">
      </div>

      <div class="keyboard">
        <ul>
          <li v-for="(item,index) in list" :key="index" @click="handelLiClick(index)">{{item.name}}</li>
        </ul>
      </div>

        <div class="next">下一步</div>

      <!-- <div class="footerTime">{{this.moment().format('YYYY-MM-DD HH:mm:ss')}}</div> -->
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from 'vant';


  export default {
    name: 'ytj',
    metaInfo: {
      title: '一体机'
    },
    data() {
      return {
        //   输入框绑定的值
        inputNum: {
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: ''
        },
        //   选中的结果
        resList: [],
        list: [{
            name: '1'
          },
          {
            name: '2'
          },
          {
            name: '3'
          },
          {
            name: '4'
          },
          {
            name: '5'
          },
          {
            name: '6'
          },
          {
            name: '7'
          },
          {
            name: '8'
          },
          {
            name: '9'
          },
          {
            name: '清空'
          },
          {
            name: '0'
          },
          {
            name: '#'
          }
        ]
      }
    },
    created() {},
    mounted() {
      var height = window.innerHeight + 'px';
      // this.$refs[container].style.height=height;
      document.getElementById('dv-container').style.height = height;
    },
    destoryed() {},

    methods: {
      handelLiClick(index) {
        //   console.log(JSON.stringify(this.list));
          
        if (index <= 8) {
          this.resList.push(this.list[index].name)
        } else if (index == 9) {
          this.resList = []
          this.inputNum = {
            one: '',
            two: '',
            three: '',
            four: '',
            five: '',
            six: ''
          }
        }else if(index==10){
            this.resList.push(this.list[index].name)
        }else if(index==11){
            this.resList.push(this.list[index].name)
        }

        this.inputNum.one = this.resList[0]
        this.inputNum.two = this.resList[1]
        this.inputNum.three = this.resList[2]
        this.inputNum.four = this.resList[3]
        this.inputNum.five = this.resList[4]
        this.inputNum.six = this.resList[5]
      }
    }
  }

</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    overflow: hidden;
    background-color: #EDF7F6;
    padding: 27px 15px;

    .next {
        width: 347px;
        height: 52px;
        text-align: center;
        line-height: 52px;
        background-color: #039D80;
        border-radius: 10px;
        font-size: 17px;
        color: white;
        margin: 0 auto;
    }

    .keyboard {
      width: 310px;
      height: 310px;
      //   border: 1px solid red;
      margin: 30px auto 0;

      ul {
        li {
          width: 70px;
          height: 55px;
          background-color: #56A6BC;
          border-radius: 10px;
          float: left;
          font-size: 25px;
          text-align: center;
          line-height: 55px;
          color: white;
          margin: 5px 15px;
        }
      }
    }

    .header {
      overflow: hidden;
      padding: 20px 0;

      .left {
        float: left;
        font-size: 17px;
        margin-left: 30px;
      }

      .right {
        float: right;

        img {
          width: 40px;
          height: 40px;
        }

        span {
          display: inline-block;
          width: 78px;
          height: 37px;
          font-size: 13px;
          vertical-align: top;
          //    line-height: 25px;
        }
      }
    }

    .inputInfo {
      width: 100%;
      text-align: center;

      input {
        width: 45px;
        height: 45px;
        margin: 0 3px;
        border-radius: 10px;
        outline: none;
        border: none;
        text-align: center;
        line-height: 45px;
        font-size: 20px;
      }
    }

    .total {
      width: 140px;
      height: 27px;
      text-align: center;
      height: 27px;
      color: #006B57;
      font-size: 20px;
      margin: 10px auto;
    }

    .footerTime {
      width: 275px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      margin: 0 auto;
      // border: 1px solid red;
      border-radius: 10px;
      background-color: #C7E4ED;

    }


  }

</style>
