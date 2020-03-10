<template>
  <div class='container'>
    <el-card class='card'>
      <div>
        <el-button style="margin-left:25px" type="primary" class='addUserBtn' @click="addUsersDialogFormVisible=true">
          添加用户组</el-button>
      </div>
      <div class='btnContainer' v-for='(item,index) in userInfoList' :key='index'>
        <el-button class='userBtn' @click='getInfo(item)'>{{item.groupName}}</el-button>
        <el-button type="danger" @click="open(item,2)">删除</el-button>
      </div>



      <el-dialog @close='addUSersRulesClose("addUserRuleForm")' title="添加用户组" :visible.sync="addUsersDialogFormVisible">
        <el-form :model="addUserForm" :rules="addUSersRules" ref="addUserRuleForm">
          <el-form-item label="用户组名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addUserForm.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUsersDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAddUserForm('addUserRuleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class='card-right' v-show='addStaffShow'>
      <div>
        <el-button type='primary' @click='getPush'>新增成员</el-button><br />
        <el-tag closable @close='deleteTag(item)' style="margin-top:15px" class='tag'
          v-for='(item,index) in userNameList' :key='index'>{{item.userName}}
        </el-tag>
      </div>

      <el-dialog title="成员" :visible.sync="userDialogTableVisible">
        <el-table border ref="multipleTable" :data="userTableData" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="userName" label="用户姓名">
              
          </el-table-column>
          <el-table-column prop="userAccount" label="用户昵称">
          </el-table-column>
          <el-table-column prop="userPhone" label="用户手机号">
          </el-table-column>
          <el-table-column prop="companyName" label="所属企业">
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userDialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUSerTocontral">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>




    <el-card class='card-right' v-show='addMenu'>
      <div>
        <el-button type='primary' @click='getPushMenu'>新增菜单</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%;margin-top:20px">
        <el-table-column prop="groupName" label="用户组名称">
        </el-table-column>
        <el-table-column prop="pageName" label="所属页面名称">
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称">
        </el-table-column>
        <el-table-column prop="menuLevel" label="菜单等级">
        </el-table-column>
        <el-table-column prop="menuSortNum" label="菜单排列顺序">
        </el-table-column>
        <el-table-column prop="fatherMenuName" label="父菜单名称">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope='scope'>
            <el-button type="text" @click="open(scope.row,1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[ 10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
  import {
    userInfo,
    getInfo,
    grouppermissionList,
    discardGrouppermission,
    appendGrouppermission,
    discardGroup,
    appendGroup,
    userLsit,
    groupUSer,
    deleteUSer
  } from '@/api/xtgl/qxgl'

  export default {
    name: 'XtglXtpz',
    data() {
      return {
        userDialogTableVisible: false,
        userTableData: [],
        formLabelWidth: '180px',
        addUsersDialogFormVisible: false,
        addMenu: false,
        addStaffShow: false,
        userInfoList: [],
        userNameList: [],
        tableData: [],
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0,
        item: {},
        addUserForm: {
          name: ''
        },
        addUSersRules: {
          name: [{
            required: true,
            message: '请输入用户组姓名',
            trigger: 'blur'
          }],
        },
        multipleSelection: []
      }
    },
    created() {
      this.getUserLIst()
    },
    mounted() {},
    destoryed() {},
    methods: {
      // 删除用户
      async deleteTag(item) {
        let params = {
          groupId: this.item.id,
          userId: item.id
        }
        const res = await deleteUSer(params)
        if (res.code == '0') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        this.getInfo(this.item)
      },
      async addUSerTocontral() {
        let userArr = ''
        this.multipleSelection.forEach(element => {
          userArr += element.id + ','
        });

        let params = {
          groupId: this.item.id,
          managerIds: userArr
        }

        const res = await groupUSer(params)
        this.userDialogTableVisible = false
        this.getInfo(this.item)
        this.multipleSelection = []

      },
      // 用户多选操作
      handleSelectionChange(value) {
        this.multipleSelection = value
      },
      // 新增用户组
      submitAddUserForm(addUserRuleForm) {
        this.$refs[addUserRuleForm].validate(async (valid) => {
          if (valid) {
            let params = {
              groupName: this.addUserForm.name
            }
            const res = await appendGroup(params)
            if (res.code == '0') {
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            }
            this.getUserLIst()
            this.addUsersDialogFormVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      addUSersRulesClose(addUserRuleForm) {
        this.$refs[addUserRuleForm].resetFields();
      },


      async getUserLIst() {

        const res = await userInfo()
        // console.log(res)
        this.userInfoList = res.data
      },
      async getInfo(item) {
        this.item = item
        this.addStaffShow = true
        this.addMenu = true
        let params = {
          groupId: item.id
        }
        const result = await getInfo(params)
        console.log(result)
        this.userNameList = result.data
        let params2 = {
          groupId: item.id,
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize
        }
        const supperRes = await grouppermissionList(params2)
        this.tableData = supperRes.data
        this.total = supperRes.page.resultCount
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getInfo(this.item)
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getInfo(this.item)
      },

      open(row, flag) {
        console.log(row)
        this.$confirm('此操作将永久删除, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          if (flag == 1) {
            let params = {
              groupId: this.item.id
            }
            const res = await discardGrouppermission(params)
            if (res.code == '0') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.personSetting()
          } else {
            let params = {
              id: row.id
            }
            const res = await discardGroup(params)
            if (res.code == '0') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
            this.getUserLIst()
            this.addMenu = false
            this.addStaffShow = false
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async getPush() {
        const res = await userLsit()
        console.log(res);
        this.userTableData = res.data
        this.userDialogTableVisible = true
      },
      getPushMenu() {
        this.$router.push({
          path: '/xtgl/xtcd'
        })
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
    overflow: hidden;

    .tag {
      cursor: pointer;
    }

    .card {
      height: 100%;
      width: 20%;
      float: left;
    }

    .card-right {
      width: 80%;
      float: right;
    }

    .btnContainer {
      margin: 0 auto;
      padding: 10px 0;
      text-align: center;
    }

    .tag {
      margin: 10px 5px 5px 0;
    }


  }

</style>
