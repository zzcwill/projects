<template>
  <div class="container">
    <el-card class="box-card">
      <div class="container_hd">
        <span>卡片状态:</span>
        <el-select v-model="cardValue" placeholder="全部">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left:50px;">卡片编号:</span>
        <el-input clearable @clear='inputClear' class="eCArdInput" v-model="cardInput" placeholder="请输入您要搜索的卡编号"></el-input>
        <el-button class="eCardBtn" @click="searchCardInfo" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button class="eCardBtnStorage" type="primary" @click="putIntoStorage()">入库</el-button>

        <el-dialog title='入库卡片' :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="入库时间" :label-width="formLabelWidth" prop="time">
              <el-input style="width:80%" v-model="form.time" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="入库数量" :label-width="formLabelWidth" prop='count'>
              <el-input style="width:80%" v-model="form.count" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="卡片开始编号" :label-width="formLabelWidth" prop="number">
              <el-input style="width:80%" v-model="form.number" autocomplete="off"></el-input>
              <el-button type="primary">读卡</el-button>
            </el-form-item>
            <el-form-item label="卡类型" :label-width="formLabelWidth" prop="cardType">
              <el-select v-model="form.cardType" placeholder="请选择卡类型" style="width:80%">
                <el-option label="ID卡" value="ID卡"></el-option>
                <el-option label="IC卡" value="IC卡"></el-option>
                <el-option label="RFID卡" value="RFID卡"></el-option>
                <el-option label="NFC卡" value="NFC卡"></el-option>
                <el-option label="Mifare卡" value="Mifare卡"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="芯片类型" :label-width="formLabelWidth" prop="type">
              <el-input style="width:80%" v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="cos版本" :label-width="formLabelWidth" prop="version">
              <el-input style="width:80%" v-model="form.version" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内存大小" :label-width="formLabelWidth" prop="size">
              <el-input style="width:50%" v-model="form.size" autocomplete="off"></el-input>
              <!-- <span style="font-size:20px;margin-left:20px">kb</span> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="keepStore('form')">入库保存</el-button>
          </div>
        </el-dialog>

        <br />

      </div>
      <div class="container_bd">
        <el-table ref="multipleTable" stripe :border="true" :data="tableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="cardNo" label="卡编号" width="120">
          </el-table-column>
          <el-table-column prop="chipType" label="芯片型号" width="120">
          </el-table-column>
          <el-table-column prop="cosVer" label="cos版本" width="120">
          </el-table-column>
          <el-table-column prop="memorySize" label="内存大小" width="120">
          </el-table-column>
          <el-table-column prop="cardType" label="卡类型" width="120">
          </el-table-column>
          <el-table-column prop="playerUserPhone" label="使用者手机号" width="120">
          </el-table-column>
          <el-table-column prop="statesName" label="状态">

          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[ 10, 20,30,40,50]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>

        </div>
      </div>



    </el-card>

  </div>
</template>

<script>
  // import { getInfo } from '@/api/user'
  import {
    cardManagement,
    putInStorage
  } from '@/api/zkgl/eCardSystem'
  export default {

    name: 'ZkglKpgl',
    data() {
      return {
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 下拉框中的内容
        options: [{
            value: '',
            label: '全部'
          },
          {
            value: '1',
            label: '在库'
          }, {
            value: '2',
            label: '出库'
          }, {
            value: '3',
            label: '挂失'
          }, {
            value: '4',
            label: '异常'
          }, {
            value: '9',
            label: '销毁'
          }
        ],
        // table表格中保存的内容
        tableData: [],
        // 卡片状态数据双向绑定
        cardValue: '',
        // 精准搜索绑定值
        cardInput: '',
        // 弹出框表单的提交
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          time: '',
          count: '',
          number: '',
          cardType: '',
          type: '',
          version: '',
          size: ''
        },
        rules: {
          count: [{
            required: true,
            message: '请填写数量',
            trigger: 'blur'
          }],
          number: [{
            required: true,
            message: '请填写卡片编号',
            trigger: 'blur'
          }],
          cardType: [{
            required: true,
            message: '请选择卡片类型',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请填写芯片类型',
            trigger: 'blur'
          }],
          version: [{
            required: true,
            message: '请填写版本号',
            trigger: 'blur'
          }],
          size: [{
            required: true,
            message: '请填写内存大小',
            trigger: 'blur'
          }]
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.getCardManagement()
    },
    mounted() {

    },
    destoryed() {

    },
    methods: {
      inputClear(){
        this.getCardManagement()
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //   分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getCardManagement()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getCardManagement()
      },
      // 进入页面调取接口的方法

      getCardManagement() {
        var params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize, //页大小
          cardStatesCode: this.cardValue.trim(),
          cardNo: this.cardInput.trim(),
          delFlag:'0'
        }

        cardManagement(params).then(res => {
            this.tableData = res.data.cardResponseList;
            this.total = res.data.resultCount;
            console.log(res.page.resultCount);

          })
          .catch(function (error) {
            // this.$message.error('数据获取失败');
          });
      },
      // 一键搜索点击的函数
      searchCardInfo() {
        this.currentPage = 1;
        var params = {
          statesCode: this.cardValue.trim(),
          cardNo: this.cardInput.trim(),
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize, //页大小 
        }
        cardManagement(params).then(res => {
          // console.log(res);
          // return false;
          this.tableData = res.data.cardResponseList;
          this.total = res.data.resultCount;
        }).catch(function (error) {
          // this.$message.error('数据获取失败');
        });
      },
      // 入库操作显示dialog对话框
      putIntoStorage() {
        this.form.time = this.moment(this.dat).format("YYYY-MM-DD HH:mm:ss")
        this.dialogFormVisible = true;
      },
      // 入库保存
      keepStore(form) {
        var params = {
          inStorageTime: this.form.time,
          cardNum: this.form.count,
          cardNo: this.form.number,
          cardType: this.form.cardType,
          chipType: this.form.type,
          cosVer: this.form.version,
          memorySize: this.form.size
        }
        this.$refs[form].validate((valid) => {
          if (valid) {
            putInStorage(params).then(res => {
              if (res.code == '0') {
                this.$message.success('入库成功');
                this.$refs[form].resetFields();
                this.getCardManagement()
                this.dialogFormVisible = false;
              }
            }).catch(error => {
              // this.$message.error('入库失败');
              this.$refs[form].resetFields();
              this.dialogFormVisible = false;
            })
          }
        })
      },

    }
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .block {
      display: inline-block;
      margin-top: 10px;
    }

    .container_hd {
      .eCArdInput {
        width: 221px;
        margin-top: 10px;
      }

      .eCardBtn {
        margin-left: 20px;
      }

      .eCardBtnStorage {
        margin-left: 50px;
      }
    }

    .container_bd {
      margin-top: 50px;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }

  .dialog-footer {
    text-align: center;
  }

</style>
