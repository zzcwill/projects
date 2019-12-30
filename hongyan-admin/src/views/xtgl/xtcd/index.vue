<template>
  <div class="container">
    <el-card class="box-card">
      <el-button style="float:left" type="primary" @click="dialogFormVisibleCreat=true">新建</el-button>

      <!-- <el-upload class="upload-demo" action=""  :before-upload="beforeUpload"  :limit="1"  >
        <el-button size="small" type="primary">导入</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload> -->

      <el-upload class="upload-demo" :headers="myHeaders" action="http://192.168.21.148:7777/api/1.0/xtgl/menu/uploadExcel"
        :before-remove="beforeRemove" :limit="1">
        <el-button size="small" type="primary">导入</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload>

      <span class="cdSpan">菜单名称</span>
      <el-input @blur="ClearInput" class="input" v-model="input" placeholder="请输入菜单名称"></el-input>

      <el-button style="margin-left:10px" type="primary" @click="searchList()">检索</el-button>
    </el-card>

    <el-card class="box-card box-card-bd">

      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="菜单id" width="130">
        </el-table-column>
        <el-table-column prop="fatherMenuId" label="上级菜单id" width="150">
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称" width="150">
        </el-table-column>
        <el-table-column prop="menuLevel" label="菜单级别" width="150">
        </el-table-column>
        <el-table-column prop="menuType" label="菜单类别" width="150">
        </el-table-column>
        <el-table-column prop="menuUrl" label="菜案内容" width="150">
        </el-table-column>
        <el-table-column prop="menuSortNum" label="排列顺序" width="150">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
              @click="modifyList(scope.row.id,scope.row.fatherMenuId,scope.row.menuName,scope.row.menuUrl,scope.row.menuSortNum)">
              编辑</el-button>
            <el-button type="danger" @click="open(scope.row.id,1)">删除</el-button>
            <el-button type="info" @click="open(scope.row.id,2)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>



      <!-- 编辑的弹框 -->
      <el-dialog title="" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="菜单id" :label-width="formLabelWidth" prop="id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单id" :label-width="formLabelWidth" prop="fatherMenuId">
            <el-input v-model="form.fatherMenuId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单级别" :label-width="formLabelWidth" prop="menuLevel">
            <el-radio-group v-model="form.menuLevel">
              <el-radio label="1">一级菜单</el-radio>
              <el-radio label="2">二级菜单</el-radio>
              <el-radio label="3">三级菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
            <el-input v-model="form.menuName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单类别" :label-width="formLabelWidth" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="10">本地栏目</el-radio>
              <el-radio label="20">远程页面</el-radio>
              <el-radio label="30">内部页面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单内容" :label-width="formLabelWidth" prop="menuUrl">
            <el-input v-model="form.menuUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排列顺序" :label-width="formLabelWidth" prop="menuSortNum">
            <el-input v-model="form.menuSortNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyInfoList('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 新建菜单的弹框 -->
      <el-dialog title="" :visible.sync="dialogFormVisibleCreat">
        <el-form :model="formCreate" :rules="rulesCreat" ref="ruleFormCreat">
          <el-form-item label="上级菜单id" :label-width="formLabelWidth" prop="fatherMenuId">
            <el-input v-model="formCreate.fatherMenuId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单级别" :label-width="formLabelWidth" prop="menuLevel">
            <el-radio-group v-model="formCreate.menuLevel">
              <el-radio label="1">一级菜单</el-radio>
              <el-radio label="2">二级菜单</el-radio>
              <el-radio label="3">三级菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="menuName">
            <el-input v-model="formCreate.menuName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单类别" :label-width="formLabelWidth" prop="menuType">
            <el-radio-group v-model="formCreate.menuType">
              <el-radio label="10">本地栏目</el-radio>
              <el-radio label="20">远程页面</el-radio>
              <el-radio label="30">内部页面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单内容" :label-width="formLabelWidth" prop="menuUrl">
            <el-input v-model="formCreate.menuUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排列顺序" :label-width="formLabelWidth" prop="menuSortNum">
            <el-input v-model="formCreate.menuSortNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCreat = false">取 消</el-button>
          <el-button type="primary" @click="creatMenu('ruleFormCreat')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    settingInfoList,
    modifyInfoList,
    discardInfoList,
    appendInfoList,
    uploadExcel
  } from '@/api/xtgl/cdgl'

  import {
    getToken
  } from '@/utils/auth'
  const myToken = getToken()

  import {
    async
  } from 'q'

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        myHeaders: {
          token: myToken
        },
        currentPage: 1, // 分页
        pageSize: 5, // 分页
        total: 0, // 分页
        // 菜单名称的绑定
        input: '',
        // 弹框的显示和隐藏
        dialogFormVisible: false,
        // 新建弹框的显示和隐藏
        dialogFormVisibleCreat: false,
        // 输入的数据
        form: {
          id: '',
          fatherMenuId: '',
          menuLevel: '',
          menuName: '',
          menuType: '',
          menuUrl: '',
          menuSortNum: ''
        },
        formCreate: {
          fatherMenuId: '',
          menuLevel: '',
          menuName: '',
          menuType: '',
          menuUrl: '',
          menuSortNum: ''
        },
        // 表单验证规则
        rules: {
          menuLevel: [{
            required: true,
            message: '请选择菜单级别',
            trigger: 'change'
          }],
          menuType: [{
            required: true,
            message: '请选择菜单类别',
            trigger: 'change'
          }]
        },
        // 新建的弹框验证规则
        rulesCreat: {
          menuLevel: [{
            required: true,
            message: '请选择菜单级别',
            trigger: 'change'
          }],
          menuType: [{
            required: true,
            message: '请选择菜单类别',
            trigger: 'change'
          }],

          menuName: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blue'
          }],
          menuUrl: [{
            required: true,
            message: '请输入菜单内容',
            trigger: 'blue'
          }],
          menuSortNum: [{
            required: true,
            message: '请输入排列顺序',
            trigger: 'blue'
          }],
        },
        formLabelWidth: '120px',
        // 表格数据
        tableData: []
      }
    },
    created() {
      this.initializedList()
    },
    mounted() {},
    destoryed() {},
    methods: {
      // 导入文件
      //  async beforeUpload(file){
      //     const res=await uploadExcel(file)
      //     console.log(res);

      //   },
      // 进入页面初始化数据
      async initializedList() {
        const params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await settingInfoList(params)
        console.log(res);

        if (res.code == 0) {
          this.tableData = res.data;
          this.total = res.page.resultCount;
        } else {
          this.$message.error('获取数据失败！')
        }
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.initializedList()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.initializedList()
      },
      // 检索
      async searchList() {
        if (this.input == '') {
          this.$message.info('请输入菜单名称')
        } else {
          const params = {
            menuName: this.input.trim(),
            pageCurrent: this.currentPage, //页码
            pageLimit: this.pageSize
          }
          const res = await settingInfoList(params)
          if (res.code == 0 && res.data != undefined) {
            this.tableData = res.data;
            this.total = res.page.resultCount;
          } else {
            this.$message.info('请输入正确的菜单名称')
          }
        }
      },
      // 编辑菜单
      modifyList(id, fatherMenuId, menuName, menuUrl, menuSortNum) {
        this.dialogFormVisible = true
        this.form.id = id
        this.form.fatherMenuId = fatherMenuId
        this.form.menuName = menuName
        this.form.menuUrl = menuUrl
        this.form.menuSortNum = menuSortNum
      },
      // 编辑之后保存
      modifyInfoList(ruleForm) {
        var params = {
          id: this.form.id,
          fatherMenuId: this.form.fatherMenuId,
          menuName: this.form.menuName,
          menuUrl: this.form.menuUrl,
          menuSortNum: this.form.menuSortNum,
          menuLevel: this.form.menuLevel,
          menuType: this.form.menuType
        }

        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            const res = await modifyInfoList(params)
            console.log(res);
            if (res.code == '0') {
              this.$message.success('数据更新成功')
            } else {
              this.$message.error('数据更新失败')
            }
            this.dialogFormVisible = false
            this.initializedList()
            this.$refs[ruleForm].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 删除菜单

      open(id, flag) {
        if (flag == 1) {
          this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const params = {
              id: id
            }
            const res = await discardInfoList(params)
            if (res.code == 0) {
              this.$message.success('删除成功')
            } else {
              this.$message.success('删除失败')
            }
            this.initializedList()

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$confirm('此操作将永久停用数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            const params = {
              id: id
            }
            const res = await modifyInfoList(params)
            if (res.code == 0) {
              this.$message.success('停用成功')
            } else {
              this.$message.success('停用失败')
            }
            this.initializedList()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消停用'
            });
          });
        }
      },

      // 新建菜单
      creatMenu(ruleFormCreat) {

        const params = {
          menuName: this.formCreate.menuName,
          menuUrl: this.formCreate.menuUrl,
          menuSortNum: this.formCreate.menuSortNum,
          menuLevel: this.formCreate.menuLevel,
          menuType: this.formCreate.menuType
        }
        if (this.formCreate.menuLevel != 1) {
          params.fatherMenuId = this.formCreate.fatherMenuId
        }
        this.$refs[ruleFormCreat].validate(async (valid) => {
          if (valid) {
            const res = await appendInfoList(params)
            console.log(res);
            if (res.code == '0') {
              this.$message.success('新建成功')
            } else {
              this.$message.error('新建失败')
            }
            this.dialogFormVisibleCreat = false
            this.initializedList()
            this.$refs[ruleFormCreat].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 文件上传
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      ClearInput(){
        if(this.input==''){
          this.initializedList()
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

    .cdSpan {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      margin-left: 245px;
      float: left;
    }

    .input {
      width: 15%;
      margin-left: 10px;
      float: left;
    }

    .box-card-bd {
      margin-top: 20px;
    }

    .upload-demo {
      margin: 0 20px;
      float: left;
    }
  }

</style>
