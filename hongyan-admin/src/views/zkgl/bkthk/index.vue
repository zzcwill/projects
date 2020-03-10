<template>
  <div class="container">
    <el-card class="box-card">
      <h2>智卡查询</h2>
      <span>身份证号码</span>
      <el-input clearable  @clear='inputClear'  class="eCArdInput" v-model="playerIdCard" placeholder=""></el-input>
      <span style="margin-left:46px">手机号</span>
      <el-input clearable @clear='inputClear'   class="eCArdInput" v-model="playerUserPhone" placeholder=""></el-input>
      <el-button class="eCardBtn" @click="searchInfo()" type="primary" icon="el-icon-search">查询</el-button>

      <h2 style="margin-top:50px">基本资料</h2>
      <el-table class="table" border :data="tableData" style="width: 100%">
        <el-table-column prop="cardNo" label="卡编号" width="160">
        </el-table-column>
        <el-table-column prop="playerRealName" label="姓名" width="160">
        </el-table-column>
        <el-table-column prop="playerIdCard" label="身份证" width="160">
        </el-table-column>
        <el-table-column  label="性别" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.playerSex==1">男</span>
            <span v-if="scope.row.playerSex==2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardIssuingTime" label="开通日期" width="160">
        </el-table-column>
        <el-table-column prop="playerUserPhone" label="电话" width="160">
        </el-table-column>
        <el-table-column prop="cardStatesName" label="卡片状态" width="160">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              @click="detailInfo(scope.row.playerRealName,scope.row.playerIdCard,scope.row.playerSex,scope.row.playerUserPhone,scope.row.playerId)">
              明细</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div class="block">
          
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[ 10,20,30,40,50]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
    </el-card>




    <el-dialog title="ic一卡通资料" :visible.sync="dialogTableVisibleTable">
      <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column label="选择" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="cardNo" label="卡号" width="120">
        </el-table-column>
        <el-table-column prop="cardIssuingTime" label="开卡日期" width="120">
        </el-table-column>
        <el-table-column prop="cardStatesName" label="状态">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogFormVisibleDestroyCards = true">销毁</el-button>
        <el-button type="success" @click="dialogVisibleAbsentCard=true">退卡</el-button>
        <el-button type="success" @click="dialogFormVisible = true">补卡</el-button>
      </div>
    </el-dialog>



    <!-- dialog弹框 -->
    <el-dialog :visible.sync="dialogFormVisible" append-to-body>
      <el-form :model="form" :rules="rules" ref="rulesForm">
        <el-form-item label="卡片编号" :label-width="formLabelWidth" prop="cardNo">
          <el-input style="width:87%" @change="getCardInfo('rulesForm')" v-model="form.cardNo" autocomplete="off">
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

      <!-- 退卡二次确认弹框 -->
      <el-dialog title="提示" style="z-index:1000" :visible.sync="dialogVisibleAbsentCard" width="30%" append-to-body>
        <span>是否要退卡？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAbsentCard = false">取 消</el-button>
          <el-button type="primary" @click="withdrawCard()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 销毁卡片确认弹框 -->
      <el-dialog title="提示" style="z-index:1000" :visible.sync="dialogFormVisibleDestroyCards" width="30%" append-to-body>
        <span>是否要销毁卡片？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleDestroyCards = false">取 消</el-button>
          <el-button type="primary" @click="destruction()">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
  import {
    getCardInfo,
    withdrawCard,
    readCard,
    patchCard,
    destruction
  } from '@/api/zkgl/bkthk'

  export default {
    name: 'ZkglBkthk',
    data() {
      return {
         currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 销毁卡片二次确认弹框
        dialogFormVisibleDestroyCards:false,
        // 退卡二次确认弹框
        dialogVisibleAbsentCard:false,
        // 是否是临时卡
        isTemporaryFlag: false,
        // 表单的显示和隐藏
        dialogTableVisibleTable: false,
        // 退卡id
        idString: '',
        // 退卡编号
        cardNoString:'',
        // 查询的手机号吗
        playerUserPhone: '',
        // 查询用户的身份证号码
        playerIdCard: '',
        // 弹框的显示和隐藏
        dialogFormVisible: false,
        // 表单绑定的诗句
        form: {
          cardNo: '',
          chipType: '',
          cosVer: '',
          memorySize: '',
          isTemporary: '1'
        },
        // 点击明细保存用户信息
        userInfo: {},
        // 表单验证
        rules: {
          cardNo: [{
            required: true,
            message: '请输入卡片编号',
            trigger: 'blue'
          }]
        },
        // table表格渲染的数据
        tableData: [],
        formLabelWidth: '120px',
        multipleSelection: []
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
      this.getCardMessageInfo()
    },
    mounted() {

    },
    destoryed() {

    },
    methods: {
      inputClear(){
        this.getCardMessageInfo()
      },
      // 页面初始化，查询所有卡片列表

      async getCardMessageInfo(){
        let params={
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res=await getCardInfo(params)
        this.tableData=res.data
        this.total=res.page.resultCount
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
      // 退卡时多选的数据存储为字符串
      handleSelectionChange(val) {
        this.idString = '';
        this.cardNoString='';
        val.forEach(element => {
          if (val.length <= 1) {
            this.idString += element.id
            this.cardNoString+=element.cardNo
          } else {
            this.idString += element.id + ','
            this.cardNoString+=element.cardNo+','
          }
        });

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
      },
      // 查询用户信息公共方法
      searchInfoCommonality() {
        const params = {
          playerUserPhone: this.playerUserPhone.trim(),
          playerIdCard: this.playerIdCard.trim(),
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize, //页大小
          delFlag:'0'
        }
        getCardInfo(params).then(res => {
          if (res.data != undefined) {
            this.tableData = res.data
            this.total = res.page.resultCount;
          } else {
            this.$message.info('请输入身份证号或手机号');
          }
        }).catch(err => {
          this.$message.error('获取数据失败')
        })
      },
      // 点击查询用户信息
      searchInfo() {
        if (this.playerUserPhone == '' && this.playerIdCard == '') {
          this.$message.info('请输入身份证号或手机号');
        } else {
          this.searchInfoCommonality()
        }
      },
      // 退卡管理
      withdrawCard() {
        // console.log(this.multipleSelection);
        const params = {
          ids: this.idString,
          cardNos:this.cardNoString
        }
        if (this.idString != '') {
          withdrawCard(params).then(res => {
            if (res.code == 0) {
              this.$message.success('操作成功');
              this.dialogVisibleAbsentCard=false;
            }
            this.idString = ''
            this.cardNoString=''
            this.getCardMessageInfo()
            this.$refs.multipleTable.clearSelection();
            this.dialogTableVisibleTable = false
          }).catch(err => {
            this.idString = ''
            this.cardNoString=''
            this.getCardMessageInfo()
            this.dialogTableVisibleTable = false
            this.dialogVisibleAbsentCard=false;
            this.$refs.multipleTable.clearSelection();
            // this.$message.error('退卡失败');
          })
        } else {
          this.$message.info('请选择要退卡的数据')
          this.dialogVisibleAbsentCard=false;
        }
      },
      // 补卡管理
      sendCard(rulesForm) {
        this.$refs[rulesForm].validate((valid) => {
          if (valid) {
            const params = {
              playerRealName: this.userInfo.playerRealName,
              playerIdCard: this.userInfo.playerIdCard,
              playerSex: this.userInfo.playerSex,
              cardIssuingTime: this.userInfo.cardIssuingTime,
              playerUserPhone: this.userInfo.playerUserPhone,
              playerId: this.userInfo.playerId,
              cardNo: this.form.cardNo,
              chipType: this.form.chipType,
              cosVer: this.form.cosVer,
              memorySize: this.form.memorySize,
              isTemporary: this.form.isTemporary

            }
            patchCard(params).then(res => {
              if (res.code == 0) {
                this.$message.success('补卡成功')
                // this.searchInfoCommonality()
              }
              this.getCardMessageInfo()
              this.$refs[rulesForm].resetFields();
              this.isTemporaryFlag=false
              this.dialogFormVisible = false
              this.dialogTableVisibleTable = false
            }).catch(err => {
              // this.$message.error('补卡失败')
              this.getCardMessageInfo()
              this.$refs[rulesForm].resetFields();
              this.isTemporaryFlag=false
              this.dialogFormVisible = false
              this.dialogTableVisibleTable = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 失去焦点或者按下enter触发事件
      getCardInfo(rulesForm) {
        this.$refs[rulesForm].validate((valid) => {
          if (valid) {
            const params = {
              cardNo: this.form.cardNo
            }
            readCard(params).then(res => {
              if (res.code == 0) {
                this.form.chipType = res.data.chipType
                this.form.cosVer = res.data.cosVer
                this.form.memorySize = res.data.memorySize

              } else {
                this.$message.info('请输入正确的卡片编号')
              }
            }).catch(err => {
              // this.$message.error('读卡失败')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 点击详细保存用户信息
      detailInfo(playerRealName, playerIdCard, playerSex, playerUserPhone, playerId) {
        this.userInfo = {
          playerRealName: playerRealName,
          playerIdCard: playerIdCard,
          playerSex: playerSex,
          cardIssuingTime: this.moment(this.dat).format("YYYY-MM-DD"),
          playerUserPhone: playerUserPhone,
          playerId: playerId
        }
        this.dialogTableVisibleTable = true
      },
      // 销毁卡片
      async destruction(){
        const params = {
          ids: this.idString,
          cardNos:this.cardNoString
        }
        if(this.idString!=''){
           const res = await destruction(params)
           console.log(res);
           if(res.code==0){
             this.$message.success('销毁卡片成功！')
           }
          this.dialogFormVisibleDestroyCards=false
          this.getCardMessageInfo()
        }else{
          this.dialogFormVisibleDestroyCards=false
          this.getCardMessageInfo()
          this.$message.info('请选择要销毁的卡片数据！')
        }
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

    .btn {
      float: right;
      margin: 30px 0;
    }

    .box-card {
      width: 100%;
    }

    .eCArdInput {
      width: 221px;
    }

    .eCardBtn {
      margin-left: 20px;
    }

    .table {
      margin-top: 20px;
    }
  }

</style>
