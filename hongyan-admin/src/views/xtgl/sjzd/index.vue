<template>
  <div class="container">
    <el-card class="box-card box-card-bd">
      <el-button type="primary" style="float:left" @click="addInfo(2)">添加</el-button>
      <el-upload class="upload-demo" :headers="myHeaders" action="http://192.168.21.116:7777/api/1.0/dic/uploadExcel"  :before-remove="beforeRemove" :limit="1" >
        <el-button size="small" type="primary">导入</el-button>
        <span slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</span>
      </el-upload>
      <span style="margin-left:100px">参数分类</span>
      <el-select v-model="value" placeholder="参数分类">
        <el-option @clear="clearInput" clearable v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px" type="primary" @click="seearchList()">检索</el-button>
    </el-card>
    <el-card class="box-card box-card-bd">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="classifyId" label="业务分类ID" width="180">
        </el-table-column>
        <el-table-column prop="classifyName" label="业务分类名称" width="220">
        </el-table-column>
        <el-table-column prop="configSort" label="排序编号" width="220">
        </el-table-column>
        <el-table-column prop="typeCode" label="字典内容编码" width="220">
        </el-table-column>
        <el-table-column prop="typeName" label="字典内容名称" width="220">
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
          <el-form-item  label="业务分类ID" :label-width="formLabelWidth" prop="classifyId">
            <el-input v-model="form.classifyId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="业务分类名称" :label-width="formLabelWidth" prop="classifyName">
            <el-input v-model="form.classifyName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典内容编码" :label-width="formLabelWidth" prop="typeCode">
            <el-input v-model="form.typeCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典内容名称" :label-width="formLabelWidth" prop="typeName">
            <el-input v-model="form.typeName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序编号" :label-width="formLabelWidth" prop="configSort">
            <el-input v-model="form.configSort" autocomplete="off"></el-input>
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
    discardInfoList,
    parameterList
  } from '@/api/xtgl/sjzd'
  import {
    async
  } from 'q';

   import { getToken } from '@/utils/auth'
  const myToken=getToken()

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        // 设置token
        myHeaders:{token:myToken},
        // 添加标识
        flag: '',
        //   弹框的显示
        dialogFormVisible: false,
        currentPage: 1, // 分页
        pageSize: 5, // 分页
        total: 0, // 分页
        options: [],
        // 下拉框选中的值
        value: '',
        // form表单绑定
        form: {
          classifyId: '',
          classifyName: '',
          configSort: '',
          typeCode: '',
          typeName: ''
        },
        // 表单验证规则
        rules: {
          classifyId: [{
            required: true,
            message: '请填写分类id',
            trigger: 'blur'
          }],
          classifyName: [{
            required: true,
            message: '请填写分类名称',
            trigger: 'blur'
          }],
          configSort: [{
            required: true,
            message: '请填写参数键排序',
            trigger: 'blur'
          }],
          typeCode: [{
            required: true,
            message: '请填写展示内容编码',
            trigger: 'blur'
          }],
          typeName: [{
            required: true,
            message: '请填写展示内容',
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
      this.parameterList()
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
      // 页面初始化渲染下拉框
      async parameterList(){
        const res=await parameterList()
        if(res.code==0){
          this.options=res.data
        }        
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
          this.form.classifyId = ''
          this.form.classifyName = ''
          this.form.configSort = ''
          this.form.typeCode = ''
          this.form.typeName = ''
          this.flag = flag
          this.dialogFormVisible = true
          this.form.classifyId = row.classifyId,
          this.form.classifyName = row.classifyName,
          this.form.configSort = row.configSort,
          this.form.typeCode = row.typeCode,
          this.form.typeName = row.typeName
      },
      // 编辑按钮确认发送请求
      modifyInfoList(ruleForm) {
        if (this.flag == 1) {
          this.$refs[ruleForm].validate(async (validEdit) => {
            if (validEdit) {
              const params = {
                classifyId: this.form.classifyId,
                classifyName: this.form.classifyName,
                configSort: this.form.configSort,
                typeCode: this.form.typeCode,
                typeName: this.form.typeName
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
                classifyId: this.form.classifyId,
                classifyName: this.form.classifyName,
                configSort: this.form.configSort,
                typeCode: this.form.typeCode,
                typeName: this.form.typeName
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
        this.form.classifyId = ''
          this.form.classifyName = ''
          this.form.configSort = ''
          this.form.typeCode = ''
          this.form.typeName = ''
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
        if(this.value==''){
          this.$message.info('请选择业务分类!')
        }else{
          const params={
            classifyName:this.value,
            configKey:this.searchParameterKey.trim(),
            pageCurrent: this.currentPage,
          pageLimit: this.pageSize
          }
          const res=await InfoList(params)
          if(res.code!=0 || res.data==undefined){
            this.$message.info('请选择业务分类!')
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
        this.getSEttingList()
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
