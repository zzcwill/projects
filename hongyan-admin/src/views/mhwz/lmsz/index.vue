<template>
  <div class="container">
    <el-card>
      <span class="columnList">栏目别表</span>


            <el-button type="primary" @click="dialogFormVisibleColumn=true">添加</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="categoryName" label="字段类别名称" width="365">
        </el-table-column>
        <el-table-column prop="categoryPicUrl" label="字段类别图标URL" width="365">
        </el-table-column>
        <el-table-column prop="categorySort" label="排序" width="365">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="open(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20,30,40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      </div>

      <el-dialog title="添加栏目" :visible.sync="dialogFormVisibleColumn" @close='closeDialog("ruleForm")'>
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="栏目名称" :label-width="formLabelWidth" prop="columnName">
            <el-input v-model="form.columnName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标URL" :label-width="formLabelWidth" prop="imgUrl">
            <el-input v-model="form.imgUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
            <el-input v-model="form.sort" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleColumn = false">取 消</el-button>
          <el-button type="primary" @click="insertInfo('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {
    columnList,
    appendColumnList,
    discardList
  } from '@/api/mhwz/index'
  import {
    async
  } from 'q';

  export default {

    name: 'XtglXtpz',
    data() {
      return {
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        formLabelWidth: '120px',
        form: {
          columnName: '',
          imgUrl: '',
          sort: ''
        },
        rules: {
          columnName: [{
            required: true,
            message: '请填写栏目名称',
            trigger: 'blur'
          }],
          imgUrl: [{
            required: true,
            message: '请填写图标url',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '请填写排序',
            trigger: 'blur'
          }]
        },
        dialogFormVisibleColumn: false,
        tableData: []
      }
    },
    created() {
      this.columnList();
    },
    mounted() {},
    destoryed() {},
    methods: {

      handleSizeChange(val) {
        this.pageSize = val;
        this.columnList()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.columnList()
      },

      async columnList() {
        let parmas={
           pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await columnList(parmas)
        console.log(res);
        this.tableData = res.data
        this.total=res.page.resultCount
      },
      // 保存数据
      saveInfo(row) {
        console.log(row);

      },
      // 删除数据
      open(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let parmas = {
            id: row.id
          }
          const res = await discardList(parmas)
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.columnList();
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      insertInfo(ruleForm) {
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            let parmas = {
              categoryName: this.form.columnName,
              categoryPicUrl: this.form.imgUrl,
              categorySort: this.form.sort
            }
            const res = await appendColumnList(parmas)
            if (res.code == 0) {
              this.$message.success('添加数据成功')
            } else {
              this.$message.info('添加数据失败')
            }
            this.columnList();
            this.dialogFormVisibleColumn = false
            this.$refs[ruleForm].resetFields();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeDialog(ruleForm) {
        this.$refs[ruleForm].resetFields();
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

    .columnList {
      display: inline-block;
      font-size: 20px;
      margin: 20px 0 10px 20px;
    }
  }

</style>
