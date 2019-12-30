<template>
  <div class="container">
    <el-card class="box-card box-card-bd">
      <el-button type="primary" style="float:left" @click="addInfo(2)">添加</el-button>
      <el-upload class="upload-demo" :headers="myHeaders" action="http://192.168.21.113:7777/api/1.0/page/uploadExcel"
        :before-remove="beforeRemove" :limit="1">
        <el-button size="small" type="primary">导入画面</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload>
      <el-upload class="upload-demo" :headers="myHeaders"
        action="http://192.168.21.113:7777/api/1.0/pageFunc/uploadExcel" :before-remove="beforeRemove" :limit="1">
        <el-button size="small" type="primary">导入画面按钮</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload>
      <span style="margin-left:100px">画面名称</span>
      <el-input @blur="clearInput" class="input" v-model="searchParameterKey" placeholder="请输入画面名称"></el-input>
      <el-button style="margin-left:10px" type="primary" @click="seearchList()">检索</el-button>
    </el-card>
    <el-card class="box-card box-card-bd">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="menuName" label="所属菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="fatherPageName" label="父页面名称" width="220">
        </el-table-column>
        <el-table-column prop="pageName" label="页面名称" width="220">
        </el-table-column>
        <el-table-column prop="pageVer" label="版本号" width="220">
        </el-table-column>
        <el-table-column prop="" label="页面按钮" width="220">
          <template slot-scope="scope">
            <el-button type="primary" @click="goViewInfo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="madifyList(scope.row,1)">编辑</el-button>
            <el-button type="danger" @click="delList(scope.row.classifyId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 编辑弹框 -->
      <el-dialog title="" :visible.sync="dialogFormVisible" @close='closeDialog("ruleForm")'>
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="所属菜单" :label-width="formLabelWidth" prop="menuName">
            <el-input style="width:90%" v-model="form.menuName" autocomplete="off"></el-input>
            <el-button type="primary" @click="selectUserMenu()">选择</el-button>
          </el-form-item>
          <el-form-item label="父页面名称" :label-width="formLabelWidth" prop="fatherPageName">
            <el-input style="width:90%" v-model="form.fatherPageName" autocomplete="off"></el-input>
            <el-button type="primary" @click="dialogTableVisiblePageName=true">选择</el-button>
          </el-form-item>
          <el-form-item label="页面名称" :label-width="formLabelWidth" prop="pageName">
            <el-input v-model="form.pageName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="页面版本号" :label-width="formLabelWidth" prop="pageVer">
            <el-input v-model="form.pageVer" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序编号" :label-width="formLabelWidth" prop="pageSortNum">
            <el-input v-model="form.pageSortNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="页面分组名称" :label-width="formLabelWidth" prop="pageGroup">
            <el-input v-model="form.pageGroup" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyInfoList('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 选择菜单弹出表格选择 -->
      <el-dialog title="菜单选择" :visible.sync="dialogTableVisibleMenu">
        <el-table border @row-click='selectRowContent' @expand-change='selectRowContent' :data="tableDataMenu"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.nextSubs" style="width: 50%">
                <el-table-column prop="menuName" label="二级菜单" width="180">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="selectContant(scope.row)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="一级菜单" prop="menuName">
          </el-table-column>
        </el-table>
      </el-dialog>


      <!-- 页面名称弹出框 -->

      <el-dialog title="收货地址" :visible.sync="dialogTableVisiblePageName">
        <el-table border :data="tableData">
          <el-table-column property="pageName" label="画面名称" width="150"></el-table-column>
          <el-table-column property="pageVer" label="版本号" width="200"></el-table-column>
          <el-table-column property="address" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="SelectPageName(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>


      <!-- 点击查看弹框显示内容 -->

      <el-dialog width='70%' title="" :visible.sync="dialogTableVisibleViewInfo">

        <el-card>
          <span>画面名称:</span><span>{{viewInfo.pageName}}</span>
          <span style="margin:0 200px">所属菜单名称:</span><span>{{viewInfo.menuName}}</span>
          <span>页面版本号:</span><span>{{viewInfo.pageVer}}</span>
        </el-card>

        <el-card class="middle">
          <el-button type="primary" @click="creatViewInfo(2)">新建</el-button>
          <span style="margin-left:50px">按钮名称:</span>
          <el-input style="width:25%" v-model="btnInput" placeholder="请输入按钮名称"></el-input>
          <el-button type="primary" @click="searchViewInfo">检索</el-button>
        </el-card>
        <el-table border :data="viewInfoTableData">
          <el-table-column property="menuName" label="所属菜单名称" width="140"></el-table-column>
          <el-table-column property="pageName" label="所属页面名称" width="140"></el-table-column>
          <el-table-column property="pageName" label="页面名称" width="140"></el-table-column>
          <el-table-column property="pageVer" label="页面版本号" width="140"></el-table-column>
          <el-table-column property="funcName" label="按钮名称" width="140"></el-table-column>
          <el-table-column property="funcUrl" label="按钮接口url" width="140"></el-table-column>
          <el-table-column property="menuName" label="操作">
            <tempalte slot-scope="scope">
              <el-button type="primary" @click="setViewInfo(scope.row,1)">编辑</el-button>
              <el-button type="danger" @click="delViewInfo(scope.row)">删除</el-button>
            </tempalte>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChangeViewInfo" @current-change="handleCurrentChangeViewInfo"
          :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="viewInfoTotal">
        </el-pagination>
      </el-dialog>

      <!-- 查看编辑按钮按弹框 -->
      <el-dialog title="" :visible.sync="dialogFormVisibleSetViewInfo" @close='clearSetRule("ruleViewInfoForm")'>

        <el-form :model="viewFormInfo" :rules="viewRule" ref="ruleViewInfoForm">
          <el-form-item :label-width="formLabelWidth">
            <span>画面名称:</span><span>{{viewInfo.pageName}}</span>
            <span style="margin:0 100px">所属菜单名称:</span><span>{{viewInfo.menuName}}</span>
            <span>页面版本号:</span><span>{{viewInfo.pageVer}}</span>
          </el-form-item>

          <el-form-item label="按钮名称" :label-width="formLabelWidth" prop="funcName">
            <el-input v-model="viewFormInfo.funcName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序编号" :label-width="formLabelWidth" prop="funcSortNum">
            <el-input v-model="viewFormInfo.funcSortNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接口url" :label-width="formLabelWidth" prop="funcUrl">
            <el-input v-model="viewFormInfo.funcUrl" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleSetViewInfo = false">取 消</el-button>
          <el-button type="primary" @click="settingViewInfo('ruleViewInfoForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    InfoList,
    modifyInfoList,
    appendInfoList,
    discardInfoList,
    userMenu,
    pageBtn,
    pageBtnModify,
    pageBtnDisCard,
    pageBtnAppend
  } from '@/api/xtgl/ywhm'
  import {
    async
  } from 'q';

  import {
    getToken
  } from '@/utils/auth'
  const myToken = getToken()

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        viewInfoFlag: '',
        // 弹框编辑绑定
        viewFormInfo: {
          funcName: '',
          funcSortNum: '',
          funcUrl: '',
          menuName: '',
          pageVer:'',
          pageName:''
        },
        // 查看编辑form表单验证规则
        viewRule: {
          funcName: [{
            required: true,
            message: '请输入按钮名称',
            trigger: 'blur'
          }],
          funcSortNum: [{
            required: true,
            message: '请输入排序编号',
            trigger: 'blur'
          }],
          funcUrl: [{
            required: true,
            message: '请输入接口url',
            trigger: 'blur'
          }],
        },
        dialogFormVisibleSetViewInfo: false,
        currentPageViewInfo: 1, // 分页
        pageSizeViewInfo: 5, // 分页
        viewInfoTotal: 0,
        // 按钮表格数据
        viewInfoTableData: [],
        // 按钮名称绑定数据
        btnInput: '',
        // 查看按钮弹框数据
        viewInfo: {
          id: '',
          menuName: '',
          pageName: '',
          pageVer: ''
        },
        dialogTableVisibleViewInfo: false,
        // 页面名称弹框
        dialogTableVisiblePageName: false,
        // 一级菜单内容
        oneMenuContant: '',
        // 二级菜单内容
        twoMenuContant: '',
        tableDataMenu: [],
        // 设置token
        myHeaders: {
          token: myToken
        },
        // 添加标识
        flag: '',
        // 菜单选择表格的显示和隐藏
        dialogTableVisibleMenu: false,
        //   弹框的显示
        dialogFormVisible: false,
        currentPage: 1, // 分页
        pageSize: 5, // 分页
        total: 0, // 分页
        options: [],
        // 下拉框选中的值
        value: '',
        // 检索参数key
        searchParameterKey: '',
        // form表单绑定
        form: {
          menuName: '',
          fatherPageName: '',
          pageName: '',
          pageVer: '',
          pageSortNum: '',
          pageGroup: ''
        },
        // 表单验证规则
        rules: {
          menuName: [{
            required: true,
            message: '请选择所属菜单名称',
            trigger: 'blur'
          }],
          fatherPageName: [{
            required: true,
            message: '请选择父页面名称',
            trigger: 'blur'
          }],
          pageName: [{
            required: true,
            message: '请填写页面名称',
            trigger: 'blur'
          }],
          pageVer: [{
            required: true,
            message: '请填写页面版本号',
            trigger: 'blur'
          }],
          pageSortNum: [{
            required: true,
            message: '请填写排序编号',
            trigger: 'blur'
          }],
          pageGroup: [{
            required: true,
            message: '请填写页面分组名称',
            trigger: 'blur'
          }]
        },
        formLabelWidth: '120px',
        // 表格数据
        tableData: []
      }
    },
    created() {
      this.getSEttingList()
    },
    mounted() {},
    destoryed() {},
    methods: {
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getSEttingList()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getSEttingList()
      },
      // 页面初始化调用函数
      async getSEttingList() {
        const params = {
          pageCurrent: this.currentPage,
          pageLimit: this.pageSize
        }
        const res = await InfoList(params)
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
          this.total = res.page.resultCount
        } else {
          this.$message.info('数据获取失败')
        }
      },
      // 编辑按钮
      madifyList(row, flag) {
        this.form.menuName = ''
        this.form.fatherPageName = ''
        this.form.pageName = ''
        this.form.pageVer = ''
        this.form.pageSortNum = ''
        this.form.pageGroup = ''
        this.flag = flag
        this.dialogFormVisible = true
        this.form.pageName = row.pageName
        this.form.fatherPageName = row.fatherPageName
        this.form.pageVer = row.pageVer
        this.form.pageSortNum = row.pageSortNum
        this.form.pageGroup = row.pageGroup
        this.form.pageUrl = row.pageUrl
      },
      // 编辑按钮确认发送请求
      modifyInfoList(ruleForm) {
        if (this.flag == 1) {
          this.$refs[ruleForm].validate(async (validEdit) => {
            if (validEdit) {
              const params = {
                menuName: this.form.menuName,
                fatherPageName: this.form.fatherPageName,
                pageName: this.form.pageName,
                pageVer: this.form.pageVer,
                pageSortNum: this.form.pageSortNum,
                pageGroup: this.form.pageGroup
              }
              const res = await modifyInfoList(params)
              console.log(res);
              if (res.code == 0) {
                this.$message.success('修改成功')
              } else {
                this.$message.error('修改失败')
              }
              this.$refs[ruleForm].resetFields();
              this.dialogFormVisible = false;
              this.getSEttingList()
            } else {
              console.log('error submit!!');
              return false;
            }
            valid = false
          });
        } else {
          this.$refs[ruleForm].validate(async (validAdd) => {
            if (validAdd) {
              const params = {
                menuName: this.form.menuName,
                fatherPageName: this.form.fatherPageName,
                pageName: this.form.pageName,
                pageVer: this.form.pageVer,
                pageSortNum: this.form.pageSortNum,
                pageGroup: this.form.pageGroup
              }
              const res = await appendInfoList(params)
              if (res.code == 0) {
                this.$message.success('添加成功')
              } else {
                this.$message.error('添加失败')
              }
              this.$refs[ruleForm].resetFields();
              this.getSEttingList()
              this.dialogFormVisible = false;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      // 添加数据
      addInfo(addFlag) {
        this.form.menuName = ''
        this.form.fatherPageName = ''
        this.form.pageName = ''
        this.form.pageVer = ''
        this.form.pageSortNum = ''
        this.form.pageGroup = ''
        this.flag = addFlag
        this.idShow = false
        this.dialogFormVisible = true
      },
      // 关闭弹框清空规则
      closeDialog(ruleForm) {
        this.$refs[ruleForm].resetFields();
      },
      // 删除按钮
      delList(classifyId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            classifyId: classifyId
          }
          const res = await discardInfoList(params)
          console.log(res);
          if (res.code == 0) {
            this.$message.success('删除成功')
          } else {
            this.$message.success('删除失败')
          }
          this.getSEttingList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 检索
      async seearchList() {
        if (this.searchParameterKey == '') {
          this.$message.info('请选择画面名称!')
        } else {
          const params = {
            pageName: this.searchParameterKey.trim(),
            pageCurrent: this.currentPage,
            pageLimit: this.pageSize
          }
          const res = await InfoList(params)
          if (res.code != 0 || res.data == undefined) {
            this.$message.info('请选择画面名称!')
          } else {
            this.tableData = res.data
            this.total = res.page.resultCount
          }
        }
      },
      // 导入文件
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      // 选择菜单文件
      async selectUserMenu() {
        this.dialogTableVisibleMenu = true;
        const res = await userMenu();
        if (res.code == 0) {
          this.tableDataMenu = res.data
        } else {
          this.$message.info('获取数据失败')
        }

      },
      // 点击菜单中的每一行
      selectRowContent(val) {
        this.oneMenuContant = val.menuName
      },
      // 表格内选择点击
      selectContant(row) {
        this.twoMenuContant = row.menuName
        const detail = this.oneMenuContant + '/' + this.twoMenuContant
        this.form.menuName = detail
        this.dialogTableVisibleMenu = false
        this.oneMenuContant = ''
        this.twoMenuContant = ''
      },
      // 画面名称选择
      SelectPageName(row) {
        this.form.fatherPageName = row.pageName
        this.dialogTableVisiblePageName = false
      },
      // 点击跳转
      goViewInfo(row) {
        this.getViewInfo()
        this.dialogTableVisibleViewInfo = true
        this.viewInfo.menuName = row.menuName
        this.viewInfo.pageName = row.pageName
        this.viewInfo.pageVer = row.pageVer
        this.viewInfo.id = row.id
      },
      // 获取表格数据公共方法
      async getViewInfo() {
        const params = {
          pageCurrent: this.currentPageViewInfo,
          pageLimit: this.pageSizeViewInfo,
          id: this.viewInfo.id
        }
        const res = await pageBtn(params)
        console.log(res);
        if (res.code == 0) {
          this.viewInfoTableData = res.data
        } else {
          this.$message.info('获取数据失败')
        }
        this.viewInfoTotal = res.page.resultCount
      },
      // 分页
      handleSizeChangeViewInfo(val) {
        this.pageSizeViewInfo = val;
        this.getViewInfo()
      },
      handleCurrentChangeViewInfo(val) {
        // console.log(val);
        this.currentPageViewInfo = val;
        this.getViewInfo()
      },
      setViewInfo(row,flag) {
        this.viewFormInfo.funcUrl = ''
        this.viewFormInfo.funcName = ''
        this.viewFormInfo.funcSortNum = ''
        this.viewFormInfo.menuName = ''
        this.viewInfoFlag = flag;
        this.dialogFormVisibleSetViewInfo = true
        this.viewFormInfo.funcUrl = row.funcUrl
        this.viewFormInfo.funcName = row.funcName
        this.viewFormInfo.funcSortNum = row.funcSortNum
        this.viewFormInfo.menuName = row.menuName
        this.viewFormInfo.pageVer = row.pageVer
        this.viewFormInfo.pageName = row.pageName
      },
      settingViewInfo(ruleViewInfoForm) {
        if (this.viewInfoFlag == 1) {
          this.$refs[ruleViewInfoForm].validate(async (valid) => {
            if (valid) {
              const params = {
                funcUrl: this.viewFormInfo.funcUrl,
                funcName: this.viewFormInfo.funcName,
                funcSortNum: this.viewFormInfo.funcSortNum,
                // menuName:this.viewFormInfo.menuName
              }
              const res = await pageBtnAppend(params)
              if (res.code == 0) {
                this.$message.info('修改成功')
              } else {
                this.$message.success('修改失败')
              }
              this.$refs[ruleViewInfoForm].resetFields();
              this.dialogFormVisibleSetViewInfo = false
              this.getViewInfo()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        } else {
          this.$refs[ruleViewInfoForm].validate(async (valid) => {
            if (valid) {
              const params = {
                funcUrl: this.viewFormInfo.funcUrl,
                funcName: this.viewFormInfo.funcName,
                funcSortNum: this.viewFormInfo.funcSortNum,
                menuName:this.viewFormInfo.menuName,
                pageVer:this.viewFormInfo.pageVer,
                pageName:this.viewFormInfo.pageName
              }
              const res = await pageBtnAppend(params)
              if (res.code == 0) {
                this.$message.info('新建成功')
              } else {
                this.$message.success('新建失败')
              }
              this.$refs[ruleViewInfoForm].resetFields();
              this.dialogFormVisibleSetViewInfo = false
              this.getViewInfo()
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      // 删除查看弹框list
      delViewInfo(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const params = {
            id: row.id
          }
          const res = await pageBtnDisCard(params)
          if (res.code == 0) {
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 新建
      creatViewInfo(flag) {
        this.dialogFormVisibleSetViewInfo = true
        this.viewInfoFlag = flag
        this.viewFormInfo.funcUrl = ''
        this.viewFormInfo.funcName = ''
        this.viewFormInfo.funcSortNum = ''
        this.viewFormInfo.menuName = ''
      },
      // 关闭查看弹框清空验证规则
      clearSetRule(ruleViewInfoForm){
        this.$refs[ruleViewInfoForm].resetFields();
      },

      // 查看检索按钮
     async searchViewInfo(){
        if(this.btnInput==''){
          this.$message.info('请输入按钮名称')
        }else{
          const params={
            funcName:this.btnInput
          }
          const res=await pageBtn(params)
          if(res.code!=0){
            this.$message.info('请输入正确的按钮名称')
          }
          this.getViewInfo();
        }
      },
      clearInput(){
        if(this.searchParameterKey==''){
          this.getSEttingList()
        }
      }
    },
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .input {
      width: 15%;
      margin-left: 10px;
    }

    .box-card-bd {
      margin-top: 20px;
    }

    .upload-demo {
      margin: 0 20px;
      float: left;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .middle {
      margin: 20px 0;
    }
  }

</style>
