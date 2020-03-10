<template>
  <div class="container">
    <el-card class="box-card">
      <span>手机号码</span>
      <el-input class="eCArdInput" @change="checkVal()" v-model="cardPhone" placeholder=""></el-input>
      <el-button class="eCardBtn" @click="getPersonInfo()" type="primary" icon="el-icon-search">检索</el-button>

      <div class="container_bd">
        <span>所属企业</span>
        <el-input :readonly="true" class="eCArdInput" v-model="company"></el-input>
        <span>真实姓名</span>
        <el-input :readonly="true" class="eCArdInput" v-model="realName"></el-input>
        <span>身份证号</span>
        <el-input :readonly="true" class="eCArdInput" v-model="idCard"></el-input>
        <span class="gender">性别</span>
        <span :class="{'man':true,'active':userSex == '1'}">男</span>
        <span :class="{'women':true,'active':userSex == '2'}">女</span><br />
      </div>
    </el-card>

    <el-card class="box-card box-card1">
      <el-button class="sendCard" type="primary" v-if="flag" @click="dialogFormVisible = true">发卡</el-button>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="cardNo" label="卡编号" width="220">
        </el-table-column>
        <el-table-column prop="chipType" label="芯片型号" width="220">
        </el-table-column>
        <el-table-column prop="cosVer" label="cos版本" width="220">
        </el-table-column>
        <el-table-column prop="memorySize" label="内存大小"  width="220">
        </el-table-column>
        <el-table-column prop="isTemporary" label="临时卡">
          <template slot-scope="scope">
            <span v-if="scope.row.isTemporary==1">是</span>
            <span v-if="scope.row.isTemporary==2">否</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog title='发卡' :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="rulesForm">
          <el-form-item label="卡片编号" :label-width="formLabelWidth" prop="cardNo">
            <el-input style="width:80%" @blur="getCardInfo('rulesForm')" v-model="form.cardNo" autocomplete="off">
            </el-input>
            <el-button class="sendCard" type="primary">读卡</el-button>
          </el-form-item>
          <el-form-item label="芯片类型" :label-width="formLabelWidth" prop="chipType">
            <el-input :readonly="true" v-model="form.chipType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="cos版本" :label-width="formLabelWidth" prop="cosVer">
            <el-input :readonly="true" v-model="form.cosVer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="内存大小" :label-width="formLabelWidth" prop="memorySize">
            <el-input :readonly="true" v-model="form.memorySize" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth" prop="isTemporaryFlag">
            <el-checkbox v-model="isTemporaryFlag">临时卡</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align:center" class="dialog-footer">
          <el-button type="primary" @click="sendCard('rulesForm')">保存</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    info,
    append,
    readCard,
    getPersonInfo
  } from '@/api/fkgl/index'
  export default {
    name: 'ZkglFkgl',
    data() {
      return {
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 是否临时卡
        isTemporaryFlag: false,
        // 标识，检索是否成功
        flag: false,
        //   检索输入的手机号
        cardPhone: '',
        dialogFormVisible: false,
        // 所属企业
        company: '',
        // 真实姓名
        realName: '',
        // 身份证号
        idCard: '',
        // 用户性别
        userSex: '',
        form: {
          cardNo: '',
          chipType: '',
          cosVer: '',
          memorySize: '',
          isTemporary: '1'
        },
        rules: {
          cardNo: [{
            required: true,
            message: '请输入卡片编号',
            trigger: 'blur'
          }]
        },
        formLabelWidth: '120px',
        formLabelWidth_small: '80px',
        tableData: []
      }
    },

    watch: {
      isTemporaryFlag: function (newVal, oldVal) {
        if (newVal) {
          this.form.isTemporary = '2'
        } else if (oldVal) {
          this.form.isTemporary = '1'
        }
      }
    },

    created() {
      this.getInfo()
    },
    methods: {
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getInfo()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getInfo()
      },
      getInfo() {
        var params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize, //页大小
          delFlag:'0'
        }
        info(params).then(res => {
          console.log(res);
          this.tableData = res.data;
          this.total = res.page.resultCount;
        }).catch(err => {
          // this.$message.error('数据获取失败');
        })
      },
      // 保存卡片
      sendCard(rulesForm) {
        this.$refs[rulesForm].validate((valid) => {
          if (valid) {
            var params = {
              companyName: this.company,
              playerRealName: this.realName,
              playerIdCard: this.idCard,
              playerSex: this.userSex,
              cardNo: this.form.cardNo,
              isTemporary: this.form.isTemporary,
              playerUserPhone: this.cardPhone,
              chipType: this.form.chipType,
              cosVer: this.form.cosVer,
              memorySize: this.form.memorySize,
            }
            append(params).then(res => {
              if (res.code == 0) {
                this.$message.success('保存成功');
                this.getInfo()
                this.$refs[rulesForm].resetFields();
                // 清除是否临时卡的状态
                this.isTemporaryFlag = false
                this.dialogFormVisible = false
              }
            }).catch(err => {
              this.dialogFormVisible = false
              this.$refs[rulesForm].resetFields();
              this.isTemporaryFlag = false
              // this.$message.error('保存失败');
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      getCardInfo(rulesForm) {
        var params = {
          cardNo: this.form.cardNo
        }

        this.$refs[rulesForm].validate((valid) => {
          if (valid) {
            readCard(params).then(res => {
              if (res.data != undefined) {
                this.form.chipType = res.data.chipType
                this.form.cosVer = res.data.cosVer
                this.form.memorySize = res.data.memorySize
              } else {
                this.$message.info('请输入正确的卡编号')
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })

      },
      // 获取员工信息
      async getPersonInfo() {
        this.flag=false
        let params = {
          phone: this.cardPhone.trim()
        }
        if (this.cardPhone != '') {
          const res = await getPersonInfo(params)
          console.log(res);
          // if(JSON.stringify(res.data) == "{}"){

          // }else{
          //   this.flag=true
          // }
          this.company = res.data.partnerName
          this.realName = res.data.realName
          this.idCard = res.data.idcardNumber
          this.userSex = res.data.userSex
          var paramsInfo = {
            // pageCurrent: this.currentPage, //页码
            // pageLimit: this.pageSize //页大小
            playerRealName:res.data.realName
          }
          info(paramsInfo).then(res => {
            // console.log(res);
            this.tableData = res.data;
            this.total = res.page.resultCount;
            if(res.data==undefined){
              this.flag=true
            }else{
              this.flag=false
            }
          }).catch(err => {
            // this.$message.error('数据获取失败');
          })

        } else {
          this.$message.info('请输入手机号')
        }
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

    .sendCard {
      float: right;
    }

    .box-card {
      width: 100%;
    }

    .box-card1 {
      margin-top: 10px;
      float: left;
    }

    .eCArdInput {
      width: 221px;
      margin-left: 10px;
    }

    .eCardBtn {
      margin-left: 20px;
    }

    .container_bd {
      margin-top: 30px;

      .gender {

        display: inline-block;
        width: 50px;
        height: 50px;
        text-align: right;
        line-height: 50px;
      }

      .active {
        background-color: #409EFF;
      }

      .man {
        display: inline-block;
        width: 50px;
        height: 50px;

        line-height: 50px;
        text-align: center;
        margin: 0 20px;
        border: 1px solid #cccccc;
      }

      .women {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #cccccc;
      }
    }

    .el-table td,
    .el-table th.is-leaf {
      border-top: none !important;
    }

    .block {
      display: inline-block;
      margin-top: 10px;
    }
  }

</style>
