<template>
  <div class="container">
    <el-card>

      <span style="margin-left:20px">类型:</span>
      <el-select @clear="getMachineList(0)" v-model="value" clearable placeholder="请选择">
        <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>设备编号:</span>
      <el-input style="width:15%" @blur="getMachineList(1)" v-model="input" placeholder="请输入设备编号"></el-input>
      <el-button type="primary" @click="searchInfoList" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" @click="dialogFormVisible=true" icon="el-icon-plus">新增</el-button>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="terminalNo" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="terminalTypeName" label="类型" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.terminalTypeCode=='1'">通道闸</span>
            <span v-if="scope.row.terminalTypeCode=='2'">电梯</span>
            <span v-if="scope.row.terminalTypeCode=='3'">门禁</span>
            <span v-if="scope.row.terminalTypeCode=='4'">巡更</span>
            <span v-if="scope.row.terminalTypeCode=='5'">商超</span>
            <span v-if="scope.row.terminalTypeCode=='6'">食堂</span>
            <span v-if="scope.row.terminalTypeCode=='9'">其他</span>
          </template>
        </el-table-column>
        <el-table-column prop="terminalName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="terminalModel" label="型号" width="180">
        </el-table-column>
        <el-table-column  label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.terminalStatesCode==1">正常</span>
            <span v-if="scope.row.terminalStatesCode==2">故障</span>
            <span v-if="scope.row.terminalStatesCode==3">停用</span>
            <span v-if="scope.row.terminalStatesCode==9">销毁</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="位置" width="180">
          <tempalte slot-scope="scope">
            {{scope.row.parkName}}/{{scope.row.buildingName}}/{{scope.row.floorName}}/{{scope.row.areaName}}
          </tempalte>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <tempalte slot-scope="scope">
            <el-button v-if="scope.row.terminalStatesCode=='3'" type="text">已停用</el-button>
            <el-button v-if="scope.row.terminalStatesCode=='1'||scope.row.terminalStatesCode=='2'||scope.row.terminalStatesCode=='9'" type="text" @click="open(scope.row,1)">停用</el-button>
            <el-button type="text" @click="open(scope.row,2)">删除</el-button>
          </tempalte>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>

      <!-- 新建弹框 -->
      <el-dialog @close="dialogClose('ruleForm')" title="设备新增" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="终端编号" :label-width="formLabelWidth" prop="terminalNo">
            <el-input v-model="form.terminalNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端名称" :label-width="formLabelWidth" prop="terminalName">
            <el-input v-model="form.terminalName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端型号" :label-width="formLabelWidth" prop="terminalModel">
            <el-input v-model="form.terminalModel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="终端类型" :label-width="formLabelWidth" prop="terminalTypeCode">
            <el-select style="width:100%" v-model="form.terminalTypeCode" placeholder="请选择">
              <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="区域地址" prop="areaName">
            <yq-cascader ref="headerChild"   style="width:100%" type="park" :query-data="{type:'area'}" @change="handleChangeAddress">
            </yq-cascader>
          </el-form-item>
          <!-- <el-form-item label="消息推送" :label-width="formLabelWidth" prop="isSend">
            <el-checkbox v-model="checked">开启</el-checkbox>
          </el-form-item>
          <el-form-item label="推送人员" :label-width="formLabelWidth" prop="tagLsit">
            <el-button type="primary" @click="pushNotifications">选择</el-button>
            <el-tag closable @close='handleCloseTag(index)' style="margin:0 10px" v-show='showPush' type="success" v-for="(item,index) in multipleSelection" :key="item.id">{{item.realName}}</el-tag>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="personInfo('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 消息推送弹框 -->
      <el-dialog title="员工信息" :visible.sync="dialogFormVisiblePushNotifications">
        <push-Notifications ref="multipleTable"  @selectionChange="handleSelectionChange"></push-Notifications>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblePushNotifications = false">取 消</el-button>
          <el-button type="primary" @click="getPushNotifications">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    getFacilityInfo,
    modifyFacilityInfo,
    discardFacilityInfo,
    appendFacilityInfo,
    personInfo
  } from '@/api/zkgl/dcszdgl'

  import yqCascader from './cascader'

  import pushNotifications from './indexInfo'
  import {
    async
  } from 'q'

  export default {
    components: {
      yqCascader,
      pushNotifications
    },
    name: 'zkglsksb',
    data() {
      return {
        showPush:false,
        // 多选
        multipleSelection: [],
        dialogFormVisiblePushNotifications: false,
        optionsType: [{
            value: '1',
            label: '通道闸'
          }, {
            value: '2',
            label: '电梯'
          }, {
            value: '3',
            label: '门禁'
          }, {
            value: '4',
            label: '巡更'
          }, {
            value: '5',
            label: '商超'
          },
          {
            value: '6',
            label: '食堂'
          },
          {
            value: '9',
            label: '其他'
          }
        ],
        areaValueList: '',
        tags: [],
        //   单选框
        // checked: false,
        //   弹框的显示和隐藏
        dialogFormVisible: false,
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 下拉框选中的值
        value: '',
        // input中输入的值
        input: '',
        // 表格模拟数据
        tableData: [],
        // 弹框表单
        form: {
          terminalNo: '',
          terminalName: '',
          terminalModel: '',
          terminalTypeCode: '',
          isSend: 1,
          // areaValue: '',
          parkName: '',
          buildingName: '',
          floorName: '',
          areaName: '',
          sendUserIds: ''
        },
        rules: {
          terminalNo: [{
            required: true,
            message: '填写终端编号',
            trigger: 'blur'
          }],
          terminalName: [{
            required: true,
            message: '请填写终端名称',
            trigger: 'blur'
          }],
          terminalModel: [{
            required: true,
            message: '请填写终端型号',
            trigger: 'blur'
          }],
          terminalTypeCode: [{
            required: true,
            message: '请选择终端类型',
            trigger: 'change'
          }],
          areaName:[{
            required: true,
            message: '请选择区域地址',
            trigger: 'change'
          }]

        },
        formLabelWidth: '120px'
      }
    },
    watch: {
      // checked: function (newval, oldval) {
      //   if (newval) {
      //     // 发送请求回去内容
      //     this.form.isSend = 2
      //   } else {
      //     this.form.isSend = 1
      //   }
      // }
    },
    created() {
      this.getFacilityInfo()

    },
    mounted() {


    },
    destoryed() {},
    methods: {
      // 分页
      handleSizeChange(val) {
        // console.log(val);
        this.pageSize = val;
        this.getFacilityInfo()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        // console.log(val);
        this.getFacilityInfo()
      },
      //   气泡确认弹框
      open(row, flag) {
        if (flag == 1) {
          if(row.terminalStatesCode=='1'||row.terminalStatesCode=='2'||row.terminalStatesCode=='9'){
            this.$confirm('此操作将停用设备记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const params = {
              id: row.id,
              terminalStatesCode:'3',
              terminalStatesName:'已停用'
            }
            const res = await modifyFacilityInfo(params)
            if (res.code == 0) {
              this.$message.success('操作成功')

            } else {
              this.$message.error('操作失败')
            }
            this.getFacilityInfo()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
          }
        } else {
          this.$confirm('此操作将永久删除设备记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const params = {
              id: row.id
            }
            const res = await discardFacilityInfo(params)
            if (res.code == 0) {
              this.$message.success('操作成功')
            } else {
              this.$message.error('操作失败')
            }
            this.getFacilityInfo()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //   新建确认函数
      personInfo(ruleForm) {
        // console.log(this.areaValue)
        // return
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {

            const params = {
              partnerName: 10001,
              terminalNo: this.form.terminalNo,
              terminalName: this.form.terminalName,
              terminalModel: this.form.terminalModel,
              terminalTypeCode: this.form.terminalTypeCode,
              // sendUserIds: this.form.sendUserIds.slice(0, this.form.sendUserIds.length-1),
              // isSend: this.form.isSend,
              // areaValue: this.form.areaValue,
              parkName: this.form.parkName,
              buildingName: this.form.buildingName,
              floorName: this.form.floorName,
              areaName: this.form.areaName,
            }
            const res = await appendFacilityInfo(params)
            console.log(res);
            if (res.code == 0) {
              this.$message.success('新建成功')

            }
            this.multipleSelection=[]
            // this.checked=false
            this.form.terminalTypeCode=''
            this.$refs[ruleForm].resetFields();
            this.getFacilityInfo()
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 页面初始化调用
      async getFacilityInfo() {
        let params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await getFacilityInfo(params)
        if (res.code == 0) {
          this.tableData = res.data
          this.total = res.page.resultCount;
        } else {
          this.$message.info('获取数据失败')
        }

      },
      // 级联选择框触发事件
      handleChangeAddress(val) {
        console.log(val);

        this.form.parkName = val[0].label,
          this.form.buildingName = val[1].label,
          this.form.floorName = val[2].label,
          this.form.areaName = val[3].label
      },
      //消息推送人员接口
      async personInfomation() {
        const res = await personInfo()
        if (res.code == 0) {
          this.tags = res.data
        }
      },

      // 检索接口
      async searchInfoList() {
        if (this.input == '' && this.value == '') {
          this.$message.info('请选择类型或输入设备编号')
        } else {
          this.currentPage=1
          let params = {
            pageCurrent: this.currentPage, //页码
            pageLimit: this.pageSize,
            terminalNo: this.input.trim(),
            terminalTypeCode: this.value.trim()
          }
          const res = await getFacilityInfo(params)
          if (res.code == 0) {
            this.tableData = res.data
            this.total = res.page.resultCount;
          }
        }
      },
      // 失去焦点调用函数
      getMachineList(flag) {
        if(flag==1){
          if (this.input == '') {
          this.getFacilityInfo()
        }
        }else{
          this.getFacilityInfo()
        }
      },
      // 消息推送按钮
      pushNotifications() {

        this.dialogFormVisiblePushNotifications = true
        this.personInfomation()
        this.$nextTick(() => {
          this.multipleSelection=[]
          this.$refs.multipleTable.$refs.multipleTable.clearSelection();
        })
      },
      // 多选
      handleSelectionChange(val) {

        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      getPushNotifications(){
          this.multipleSelection.forEach(element => {
          this.form.sendUserIds+=element.userCode+','
        });
        this.showPush=true
        this.dialogFormVisiblePushNotifications = false

      },
      // 点击tag标签删除
      handleCloseTag(index){
        this.form.sendUserIds=''
         this.multipleSelection.splice(index,1)

        this.multipleSelection.forEach(element => {
          this.form.sendUserIds+=element.userCode+','
        });

      },
      dialogClose(ruleForm){
        this.$refs[ruleForm].resetFields();
        this.checked=false
        this.multipleSelection=[]
        this.$refs.headerChild.showValue=[]
        
      },


    },
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .box-card {
      margin-top: 10px;
    }
  }

</style>
