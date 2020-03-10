<template>
  <div class="container">
    <el-card class="box-card">
      <span>身份证号码</span>
      <el-input clearable @clear='inputClear' class="eCArdInput" v-model="playerIdCard" placeholder=""></el-input>
      <span>手机号</span>
      <el-input clearable @clear='inputClear' class="eCArdInput" v-model="playerUserPhone" placeholder=""></el-input>
      <el-button class="eCardBtn" @click="getCardInfo()" type="primary" icon="el-icon-search">检索</el-button>

      <el-table class="table" border :data="tableData" style="width: 100%">
        <el-table-column prop="playerRealName" label="姓名" >
        </el-table-column>
        <el-table-column prop="playerIdCard" label="身份证" >
        </el-table-column>
        <el-table-column label="性别" >
          <template slot-scope="scope">
            <span v-if="scope.row.playerSex==1">男</span>
            <span v-if="scope.row.playerSex==2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardIssuingTime" label="开通日期" >
        </el-table-column>
        <el-table-column prop="playerUserPhone" label="电话" >
        </el-table-column>
        <el-table-column prop="cardStatesName" label="卡片状态" >
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              @click="openDialog(0,scope.row.playerRealName,scope.row.cardNo,scope.row.id,scope.row.cardStatesCode)"
              v-if="scope.row.cardStatesCode==2">挂失</el-button>
            <el-button type="text"
              @click="openDialog(1,scope.row.playerRealName,scope.row.cardNo,scope.row.id,scope.row.cardStatesCode)"
              v-if="scope.row.cardStatesCode==3">解挂</el-button>
            <el-button type="text"
              @click="openDialog(2,scope.row.playerRealName,scope.row.cardNo,scope.row.id,scope.row.cardStatesCode)"
              v-if="scope.row.cardStatesCode==4">解卡</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>


      <el-dialog :title='dialogTitle'  :show-close="showClose" :visible.sync="dialogVisible" height='20%' width="20%">
        <div>姓名:{{infoStroge.name}}</div>
        <div style="margin:15px 0">卡号:{{infoStroge.cardId}}</div>
        <div v-if='isCard==0'>确定挂失?</div>
        <div v-if='isCard==1'>确定解挂?</div>
        <div v-if='isCard==2'>确定解锁?</div>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="hideDialog()">取 消</el-button>
          <el-button type="primary" @click="changeState()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    getCardInfo,
    reportTheLoss,
    relieve
  } from '@/api/zkgl/gsjgjk'
  export default {
    name: 'ZkglGsjgjk',
    data() {
      return {
        dialogTitle:'',
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 身份证号码
        playerIdCard: '',
        // 手机号码
        playerUserPhone: '',
        //   不显示关闭按钮
        showClose: false,
        dialogVisible: false,
        // 存储用户信息
        infoStroge: {},
        // 查看用户点击的是什么
        isCard: '',
        // 用户输入的手机号
        cardPhone: '',
        tableData: []
      }
    },

    created() {
      this.getCardMessageInfo()
    },

    methods: {
      inputClear() {
        this.getCardMessageInfo()
      },

      async getCardMessageInfo() {
        let params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await getCardInfo(params)
        this.tableData = res.data
        this.total = res.page.resultCount
      },

      openDialog(isFlag, name, cardNumber, id, cardStatesCode) {
        if(isFlag=='0'){
          this.dialogTitle='挂失'
        }else if(isFlag=='1'){
          this.dialogTitle='解挂'
        }else{
          this.dialogTitle='解卡'
        }
        this.infoStroge = {
          isFlag: isFlag,
          name: name,
          cardId: cardNumber,
          id: id,
          cardStatesCode: cardStatesCode
        }
        this.isCard = isFlag
        this.dialogVisible = true
      },
      // 隐藏输入框
      hideDialog() {
        this.dialogVisible = false
        this.infoStroge = {}
        this.isCard = ''
      },
      // 发送请求，改变状态
      changeState() {

        if (this.infoStroge.isFlag == 0) {
          var params = {
            id: this.infoStroge.id,
            cardNo: this.infoStroge.cardId
          }
          reportTheLoss(params).then(res => {
            if (res.code == '0') {
              this.$message.success('修改状态成功')
              this.tableData = []
              var params = {
                playerIdCard: this.playerIdCard.trim(),
                playerUserPhone: this.playerUserPhone.trim()
              }
              getCardInfo(params).then(res => {
                if (res.data != undefined) {
                  res.data.forEach(element => {
                    if (element.cardStatesCode == '1' || element.cardStatesCode == '9') {

                    } else {
                      this.tableData.push(element)
                    }
                  });
                } else {
                  this.$message.info('请输入正确的身份证或手机号')
                }
              })
            }
          }).catch(err => {
            // this.$message.error('修改状态失败')
          })
        } else {
          const params = {
            id: this.infoStroge.id,
            cardNo: this.infoStroge.cardId,
          }
          relieve(params).then(res => {
            if (res.code == '0') {
              this.$message.success('修改状态成功')
              this.tableData = []
              const params = {
                playerIdCard: this.playerIdCard.trim(),
                playerUserPhone: this.playerUserPhone.trim()
              }
              getCardInfo(params).then(res => {
                if (res.data != undefined) {
                  res.data.forEach(element => {
                    if (element.cardStatesCode == '1' || element.cardStatesCode == '9') {

                    } else {
                      this.tableData.push(element)
                    }
                  });
                } else {
                  this.$message.info('请输入正确的身份证或手机号')
                }
              })
            }
          }).catch(err => {
            // this.$message.error('修改状态失败')
          })
        }
        this.dialogVisible = false

      },
      getCardInfo() {
        this.tableData = []
        if (this.playerIdCard == '' && this.playerUserPhone == '') {
          this.$message.info('请输入手机号或者身份证号')
        } else {
          var params = {
            playerIdCard: this.playerIdCard.trim(),
            playerUserPhone: this.playerUserPhone.trim(),
            pageCurrent: this.currentPage, //页码
            pageLimit: this.pageSize, //页大小
            delFlag: 0
          }
          getCardInfo(params).then(res => {
            // console.log(res);
            if (res.data != undefined) {
              res.data.forEach(element => {
                if (element.cardStatesCode == '1' || element.cardStatesCode == '9') {

                } else {
                  this.tableData.push(element)
                  this.total = res.page.resultCount;
                }
              });
            } else {
              this.$message.info('请输入正确的身份证或手机号')
            }
          }).catch(err => {
            // this.$message.error('获取数据失败')
          })
        }
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCardMessageInfo()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getCardMessageInfo()
      }
    }


  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .eCArdInput {
      width: 221px;
    }

    .eCardBtn {
      margin-left: 10px;
    }

    .table {
      margin-top: 30px;
    }

    .block {
      display: inline-block;
      margin-top: 10px;
    }
  }

</style>
