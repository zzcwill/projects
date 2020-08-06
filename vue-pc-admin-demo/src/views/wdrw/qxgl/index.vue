<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">角色管理</div>
      </div>
      <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="角色名称：" prop="name">
              <el-input v-model="searchForm.name" placeholder="角色名称" class="same-form-width"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="6" :offset="9">
            <el-form-item>
              <el-button type="primary" @click="searchTable('searchForm')">查询</el-button>
              <el-button @click="resetSearchForm('searchForm')">重置</el-button>
              <el-button type="primary" @click="toAddRole">新增角色</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-table
      max-height="380"
      v-loading="tableData.tableLoading"
      :data="tableData.tableList"
      border
      fit
      highlight-current-row>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column label="功能权限" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="节点权限" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nodes}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button @click="toOperate(row)" type="text">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="tableData.tableTotal>0"
      :total="tableData.tableTotal"
      :page.sync="searchForm.page"
      :limit.sync="searchForm.pageSize"
      @pagination="getTableList"
    ></pagination>

    <el-dialog title="新增角色" width="600px" append-to-body :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm" label-width="100px">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="角色名称：" prop="name">
              <el-input v-model="dialogForm.name" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>         
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色描述：" prop="note">
              <el-input type="textarea" v-model="dialogForm.note"></el-input>
            </el-form-item>
          </el-col>
        </el-row>        
      </el-form>      
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取消</el-button>
        <el-button type="primary" @click="saveNewRole" v-show="isNewPerson">新增</el-button>
        <el-button type="primary" @click="saveUpdateRole" v-show="!isNewPerson">保存</el-button>
      </div>
    </el-dialog>    
  </div>
</template>
<script>

import {
  zaRoleList,
  zaRoleAdd,
  zaRoleUpdate
} from '@/api/wdrw/qxgl'
import Pagination from '@/components/Pagination'

export default {
  name: 'wdrwQxgl',
  filters: {
  },
  components: {
    Pagination,
  },
  data() {
    return {
      searchForm: {
        page: 1,
        pageSize: 10,
        name: '',
      },
      rules: {
      },
      tableData: {
        tableLoading: true,
        tableList: [],
        tableTotal: 0,
      },
      dialogForm: {
        name: '',
        note: '',
        id: ''
      },
      dialogRules: {
        name: [{ required: true, message: '请输入角色信息', trigger: 'blur' }],        
      },
      dialogFormVisible: false,
      isNewPerson: true
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    searchTable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toOperate(row) {
      this.isNewPerson = false
      this.dialogForm = this._.pick(row,['name','note','id'])
      this.openDialogForm()
    },
    async getTableList() {
      this.tableData.tableLoading = true

      //自行改接扣调用
      let apiData = await zaRoleList(this.searchForm)
      this.tableData.tableList = apiData.data
      this.tableData.tableTotal = apiData.totalItem
      this.tableData.tableLoading = false
    },
    toAddRole() {
      this.isNewPerson = true
      this.openDialogForm()
    },
    saveNewRole() {
      this.$refs['dialogForm'].validate(async (valid) => {
        if (valid) {
          let newData = await zaRoleAdd(this.dialogForm)
          if(newData) {        
            this.$message('添加成功')
            this.closeDialogForm()
            this.getTableList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveUpdateRole() {
      this.$refs['dialogForm'].validate(async (valid) => {
        if (valid) {
          let newData = await zaRoleUpdate(this.dialogForm)
          if(newData) {
            this.$message('修改成功')
            this.closeDialogForm()
            this.getTableList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },    
    closeDialogForm() {
      this.dialogFormVisible = false
      this.dialogForm = {
        name: '',
        note: '',
        id: ''      
      }
    },
    openDialogForm() {
      this.dialogFormVisible = true
    }
  },
}
</script>
<style lang="scss" scoped>
</style>