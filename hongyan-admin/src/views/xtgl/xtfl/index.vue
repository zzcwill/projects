<template>
  <div class="container">
    <el-card class="box-card box-card-bd">
      <el-button type="primary" style="float:left" @click="addInfo(2)">添加</el-button>
      <el-upload class="upload-demo" :headers="myHeaders" :action="baseUrl+'/api/1.0/classify/uploadExcel'" :before-remove="beforeRemove" :limit="1" >
        <el-button size="small" type="primary">导入</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload>

      <span>参数key</span>
      <el-input @blur="clearInput" class="input" v-model="searchParameterKey" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:10px" type="primary" @click="seearchList()" icon="el-icon-search">检索</el-button>
    </el-card>
    <el-card class="box-card box-card-bd">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="业务分类ID">
        </el-table-column>
        <el-table-column prop="classifyName" label="业务分类名称">
        </el-table-column>
        <el-table-column prop="classifySort" label="排序编号">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="madifyList(scope.row,1)">编辑</el-button>
            <el-button type="text" @click="delList(scope.row.classifyId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[ 10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>

      <!-- 编辑弹框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close='closeDialog("ruleForm")'>
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item  label="业务分类id" :label-width="formLabelWidth" prop="id">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="业务分类名称" :label-width="formLabelWidth" prop="classifyName">
            <el-input v-model="form.classifyName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序编号" :label-width="formLabelWidth" prop="classifySort">
            <el-input v-model="form.classifySort" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyInfoList('ruleForm')">确 定</el-button>
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
    discardInfoList
  } from '@/api/xtgl/ywfl'
  import {
    async
  } from 'q';

   import {
    mapGetters
  } from 'vuex'

   import { getToken } from '@/utils/auth'
  const myToken=getToken()

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        dialogTitle:'',
        // 设置token
        myHeaders:{token:myToken},
        // 添加标识
        flag: '',
        //   弹框的显示
        dialogFormVisible: false,
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        options: [],
        // 检索参数key
        searchParameterKey: '',
        // form表单绑定
        form: {
          id: '',
          classifyName: '',
          classifySort: '',
        },
        // 表单验证规则
        rules: {
          id: [{
            required: true,
            message: '请填写业务分类id',
            trigger: 'blur'
          }],
          classifyName: [{
            required: true,
            message: '请填写业务分类名称',
            trigger: 'blur'
          }],
          classifySort: [{
            required: true,
            message: '请填写参数键排序',
            trigger: 'blur'
          }]
        },
        formLabelWidth: '120px',
        // 表格数据
        tableData: []
      }
    },
     computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      ...mapGetters(['token'])
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
        this.dialogTitle='编辑'
        this.flag = flag
        this.dialogFormVisible = true
          this.form.id = row.id,
          this.form.classifyName = row.classifyName,
          this.form.classifySort=row.classifySort
      },
      // 编辑按钮确认发送请求
      modifyInfoList(ruleForm) {
        if (this.flag == 1) {
          this.$refs[ruleForm].validate(async (validEdit) => {
            if (validEdit) {
              const params = {
                id: this.form.id,
                classifyName: this.form.classifyName,
                classifySort: this.form.classifySort
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
            valid=false
          });
        } else {
          this.$refs[ruleForm].validate(async (validAdd) => {
            if (validAdd) {
              const params = {
                id: this.form.id,
                classifyName: this.form.classifyName,
                classifySort: this.form.classifySort
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
        this.dialogTitle='添加'
        this.form.id = ''
          this.form.classifyName = ''
          this.form.classifySort = ''
        this.flag = addFlag
        this.idShow = false
        this.dialogFormVisible = true
      },
      // 关闭弹框清空规则
      closeDialog(ruleForm){
        this.$refs[ruleForm].resetFields();
      },
      // 删除按钮
      delList(classifyId){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const params={
            classifyId:classifyId
          }
          const res=await discardInfoList(params)
          console.log(res);
          if(res.code==0){
            this.$message.success('删除成功')
          }else{
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
      async seearchList(){
        if(this.searchParameterKey==''){
          this.$message.info('请填写参数键!')
        }else{
          this.currentPage=1
          const params={
            id:this.searchParameterKey.trim(),
            pageCurrent: this.currentPage,
          pageLimit: this.pageSize
          }
          const res=await InfoList(params)
          if(res.code!=0 || res.data==undefined){
            this.$message.info('请输入正确的参数键!')
          }else{
            this.tableData=res.data
            this.total = res.page.resultCount
          }
        }
      },
      // 导入文件
       beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
  }

</style>

