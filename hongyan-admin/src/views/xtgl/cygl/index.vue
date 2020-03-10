<template>
  <div class='container'>
    <el-card class='card-left'>
      <div class='btnContainer' v-for='(item,index) in userInfoList' :key='index'>
        <el-button class='userBtn' @click='getInfo(item)'>{{item.partnerName}}</el-button>
      </div>
    </el-card>

    <el-card class='card' v-show='departmentShow'>
      <div>
        <el-button type='primary' @click='dialogFormVisibleAddPermengt=true'>新增部门</el-button><br/>
        <el-tag style="margin-top:15px" @click='personSetting(item)' class='tag' v-for='(item,index) in userNameList' :key='index'>
          {{item.orgName}}</el-tag>
      </div>

      <el-dialog @close='addDialogClosed("pmtRuleForm")' title="新增部门" :visible.sync="dialogFormVisibleAddPermengt">
        <el-form :model="DepartmentForm" :rules="addPmtrules" ref="pmtRuleForm">
          <el-form-item label="部门名称" :label-width="formLabelWidth" prop='orgName'>
            <el-input v-model="DepartmentForm.orgName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系人名称" :label-width="formLabelWidth" prop='contactName'>
            <el-input v-model="DepartmentForm.contactName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建人" :label-width="formLabelWidth" prop='creator'>
            <el-input v-model="DepartmentForm.creator" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddPermengt = false">取 消</el-button>
          <el-button type="primary" @click="addDepartment('pmtRuleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>





    <el-card class='card' v-show='staffShow'>
      <span>人员姓名</span>
      <el-input class='input' placeholder="请输入人员姓名" v-model="userName" @clear='clearInputCon' clearable>
      </el-input>

      <span>手机号码</span>
      <el-input class='input' placeholder="请输入手机号码" v-model="userPhone" @clear='clearInputCon' clearable>
      </el-input>

      <el-button type="primary" @click='searchList'>搜索</el-button>
      <el-button type="primary" @click='showDialog("2")'>新建</el-button>

      <el-table :data="tableData" border style="width: 100%; margin-top:20px;">
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="userAccount" label="账号">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机">
        </el-table-column>
        <el-table-column prop="userSexName" label="性别">
        </el-table-column>
        <el-table-column prop="allowLoginName" label="账户状态">
        </el-table-column>
        <el-table-column label="操作" width='220px'>
          <template slot-scope='scope'>
            <el-button type="text" @click='showDialog("1",scope.row)'>编辑</el-button>
            <el-button type="text" @click="open(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[ 10, 20,30,40,50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="dialogClosed('ruleForm')">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop='userName'>
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录账号" :label-width="formLabelWidth" prop='userAccount'>
            <el-input v-model="form.userAccount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop='userPassword'>
            <el-input v-model="form.userPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="再次确认密码" :label-width="formLabelWidth" prop='isUserPwd'>
            <el-input v-model="form.isUserPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth" prop='userPhone'>
            <el-input v-model="form.userPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop='userMail'>
            <el-input v-model="form.userMail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户性别" :label-width="formLabelWidth" prop='userSexCode'>
            <el-radio-group v-model="form.userSexCode">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="宣传图" :label-width="formLabelWidth">
            <el-upload :action="baseUrl + '/api/1.0/common/file/upload/api'" :headers="{'token': token}"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="removeImg"
              :on-success="uploadImg" name="upfile" :limit="1" :file-list="fileList" :on-exceed="onExceed">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="appendInfo('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>



  </div>


</template>

<script>
  import {
    appendDepartment,
    departmentList,
    enterpriseList,
    personSetting,
    deleteInfo,
    modifyInfo,
    appendInfo
  } from '@/api/xtgl/cygl'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'XtglXtpz',
    data() {

      return {
        dialogTitle: '',
        getInfoItem: {},
        DepartmentForm: {
          orgName: '',
          contactName: '',
          creator: '',
          id: ''
        },
        dialogFormVisibleAddPermengt: false,
        item: {},
        departmentShow: false,
        staffShow: false,
        userNameList: [],
        userInfoList: [],
        flag: '',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        //人员姓名
        userName: '',
        //手机号码
        userPhone: '',
        tableData: [],
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          userName: '',
          userAccount: '',
          userPassword: '',
          isUserPwd: '',
          userPhone: '',
          userSexCode: '',
          userMail: '',
          picUrl: '',
          id: ''
        },
        addPmtrules: {
          orgName: [{
            required: true,
            message: '请填写部门名称',
            trigger: 'blur'
          }],
          contactName: [{
            required: true,
            message: '请填写联系人名称',
            trigger: 'blur'
          }],
          creator: [{
            required: true,
            message: '请填写创建人姓名',
            trigger: 'blur'
          }]
        },
        rules: {
          userName: [{
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          }],
          userAccount: [{
            required: true,
            message: '请填写账号',
            trigger: 'blur'
          }],
          userPassword: [{
            required: true,
            message: '请填写账号密码',
            trigger: 'blur'
          }],

          userPhone: [{
            required: true,
            message: '请填写手机号',
            trigger: 'blur'
          }],
          userSexCode: [{
            required: true,
            message: '请选择用户性别',
            trigger: 'change'
          }],
          userMail: [{
            required: true,
            message: '请填写用户邮箱',
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      ...mapGetters(['token'])
    },
    created() {
      this.enterpriseList()
    },
    mounted() {},
    destoryed() {},
    methods: {

      //新增部门
      addDepartment(pmtRuleForm) {
        this.$refs[pmtRuleForm].validate(async (valid) => {
          if (valid) {
            let params = {
              id: this.DepartmentForm.id,
              orgName: this.DepartmentForm.orgName,
              contactName: this.DepartmentForm.contactName,
              creator: this.DepartmentForm.creator,
              createTime: this.moment().format('YYYY-MM-DD HH:mm:ss')
            }
            const res = await appendDepartment(params)
            this.getInfo(this.getInfoItem)
            this.$refs[pmtRuleForm].resetFields();
            this.dialogFormVisibleAddPermengt = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      // 弹框关闭事件
      addDialogClosed(pmtRuleForm) {
        this.$refs[pmtRuleForm].resetFields();

        this.getInfo(this.getInfoItem)
      },


      async getInfo(item) {
        this.getInfoItem = item
        this.DepartmentForm.id = item.id
        this.staffShow = false;
        this.departmentShow = true
        let params = {
          partnerId: item.id
        }
        const res = await departmentList(params)

        this.userNameList = res.data
      },

      async enterpriseList() {
        const res = await enterpriseList()
        this.userInfoList = res.data;

      },

      async personSetting(item) {
        this.staffShow = true
        this.item = item
        let params = {
          orgId: item.id,
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await personSetting(params)
        this.tableData = res.data;
        this.total = res.page.resultCount;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.personSetting(this.item)
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.personSetting(this.item)
      },
      //输入框清空事件
      clearInputCon() {
        this.personSetting(this.item)
      },
      async searchList() {
        let params = {
          userName: this.userName.trim(),
          userPhone: this.userPhone.trim(),
          orgId: this.item.id
        }

        if (this.userName == '' && this.userPhone == '') {
          this.$message.info('请输入用户名或者手机号')
        } else {
          const res = await personSetting(params)
          console.log(res)
          this.tableData = res.data;
          this.total = res.page.resultCount;
        }
      },
      //删除数据
      open(row) {
        console.log(row)
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let params = {
            id: row.id
          }
          const res = await deleteInfo(params)
          if (res.code == '0') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.personSetting()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //图片上传方法
      removeImg(file, fileList) {
        this.imgFileList(fileList)
      },
      // 预览图片
      handlePictureCardPreview(file) {
        this.imageUrl = file.url
      },
      // 上传数量超出限制后的统一处理,两个组件共用
      onExceed(file, fileList) {
        this.$message.error('超出上传数量')
      },
      uploadImg(res, file, fileList) {
        console.log(fileList);

        file.url = res.data
        this.imgFileList(fileList)
      },
      uploadImgList(res, file, fileList) {
        file.url = res.data
        this.imgFileList(fileList)
      },
      imgFileList(fileList) {
        if (fileList.length > 0) {
          this.form.picUrl = fileList[0].url
        } else {
          this.addArticalForm.promotePicUrl = ''
        }
      },
      //弹框文件提交
      showDialog(flag, row) {
        if (flag == '1') {
          this.dialogTitle = '编辑'
        } else {
          this.dialogTitle = '新建'
        }
        console.log(row)
        this.flag = flag
        this.dialogFormVisible = true
        this.form.userName = row.userName || ''
        this.form.userAccount = row.userAccount || ''
        this.form.userPassword = row.userPassword || ''
        this.form.isUserPwd = row.userPassword || ''
        this.form.userPhone = row.userPhone || ''
        this.form.userSexCode = row.userSexCode || ''
        this.form.userMail = row.userMail || ''
        this.form.id = row.id || ''
      },


      appendInfo(formName) {
        if (this.flag == 1) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              console.log(22222)
              let params = {
                id: this.form.id,
                userName: this.form.userName,
                userAccount: this.form.userAccount,
                userPassword: this.form.userPassword,
                userPhone: this.form.userPhone,
                userSexCode: this.form.userSexCod,
                userMail: this.form.userMail,
                picUrl: this.form.picUrl
              }

              const res = await modifyInfo(params)
              console.log(res)
              this.personSetting(this.item)
              this.dialogFormVisible = false
            }
          })
        } else {
          if (this.form.userPassword == this.form.isUserPwd) {
            this.$refs[formName].validate(async (valid) => {
              if (valid) {
                console.log(22222)
                let params = {
                  userName: this.form.userName,
                  userAccount: this.form.userAccount,
                  userPassword: this.form.userPassword,
                  userPhone: this.form.userPhone,
                  userSexCode: this.form.userSexCod,
                  userMail: this.form.userMail,
                  picUrl: this.form.picUrl
                }

                const res = await appendInfo(params)
                console.log(res)
                this.personSetting(this.item)
                this.dialogFormVisible = false
              }
            })
          } else {
            this.$message.info('两次密码必须输入一致')
          }
        }
      },
      //弹框关闭的回到函数
      dialogClosed(formName) {
        this.$refs[formName].resetFields();
        this.form.userName = ''
        this.form.userAccount = ''
        this.form.userPassword = ''
        this.form.isUserPwd = ''
        this.form.userPhone = ''
        this.form.userSexCode = ''
        this.form.userMail = ''
        this.form.id = ''

      }
    }
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

    .input {
      width: 180px;
    }

    .card {
      width: 80%;
      float: left;
    }

    .card-left {
      width: 20%;
      float: left;
    }

    .btnContainer {
      margin: 0 auto;
      padding: 10px 0;
      text-align: center;
    }

    .userBtn {
      width: 100%;
    }


  }

</style>
