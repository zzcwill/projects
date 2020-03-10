<template>
  <div class="container">
    <el-card>
      <span>标题</span>
      <el-input @clear='clearInputCon' class="titleInput" placeholder="请输入内容" v-model="inputTitle" clearable></el-input>
      <span>书名</span>
      <el-input @clear='clearInputCon' class="titleInput" placeholder="请输入内容" v-model="bookTitle" clearable></el-input>
      <el-button class="btn" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <el-button class="btn" type="primary" icon="el-icon-plus" @click="addArticalList">添加</el-button>
      <el-table :data="tableData" border style="width: 100%;margin-top:20px">
        <el-table-column prop="author" label="作者" width="215">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="215">
        </el-table-column>
        <el-table-column prop="classifyName" label="分类说明" width="215">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="215">
        </el-table-column>
        <el-table-column prop="categoryName" label="类别名称" width="215">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editArtical(scope.row)">编辑</el-button>
            <el-button type="text" @click="open(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10, 20,30,40, 50]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

      <!-- 编辑弹框 -->
      <el-dialog @close="dialogClose('ruleForm')" title="编辑文章内容" :visible.sync="dialogEditFormVisible">
        <el-form :model="editArticalForm" :rules="rules" ref="ruleForm">
          <el-form-item label="请输入文章内容" prop="desc">
            <Editor style="margin-top:30px" :content.sync="editArticalForm.desc" />
            <!-- <el-input type="textarea" v-model="editArticalForm.desc"></el-input> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitResult('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加文章弹框 -->
      <el-dialog @close="addDialogClose('addRuleForm')" title="添加文章" :visible.sync="dialogAddFormVisible" width="70%">
        <el-form :model="addArticalForm" :rules="addRules" ref="addRuleForm">
          <el-form-item label="文章标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="addArticalForm.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章作者" :label-width="formLabelWidth" prop="author">
            <el-input v-model="addArticalForm.author" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="首页类型" :label-width="formLabelWidth" prop="typeCode">
            <el-select v-model="addArticalForm.typeCode" placeholder="请选择类型">
              <el-option label="标准" value="1"></el-option>
              <el-option label="音频" value="2"></el-option>
              <el-option label="视频" value="3"></el-option>
              <el-option label="用户发布" value="5"></el-option>
              <el-option label="第三方" value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首页类型" :label-width="formLabelWidth" prop="showTypeCode">
            <el-radio-group v-model="addArticalForm.showTypeCode">
              <el-radio label="1">图片</el-radio>
              <el-radio label="2">视频</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 分类名称 -->
          <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryValue">
            <el-select v-model="addArticalForm.categoryValue" clearable placeholder="请选择" @change="changeLocationValue">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="缩略图" :label-width="formLabelWidth">
            <el-upload :action="baseUrl + '/api/1.0/common/file/upload/api'" :headers="{'token': token}"
              list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="removeImg"
              :on-success="uploadImgList" name="upfile" :limit="1" :file-list="fileList" :on-exceed="onExceed">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="简介" :label-width="formLabelWidth" prop="synopsis">
            <el-input type="textarea" v-model="addArticalForm.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
            <Editor :content.sync="addArticalForm.content" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addArticalContant('addRuleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import Editor from './editor.vue'

  import {
    mapGetters
  } from 'vuex'

  import {
    articleList,
    deleteArtical,
    editArtical,
    addArtical,
    addArticalList,
    enterpriseInfo
  } from '@/api/mhwz/index'
  import {
    async
  } from 'q'

  export default {
    components: {
      Editor
    },
    name: 'XtglXtpz',
    data() {
      return {
        options: [],
        fileList: [], //文件
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        addRules: {
          title: [{
            required: true,
            message: '请输入文章标题',
            trigger: 'blur'
          }],
          author: [{
            required: true,
            message: '请输入文章作者',
            trigger: 'blur'
          }],
          typeCode: [{
            required: true,
            message: '请选择类型',
            trigger: 'change'
          }],
          showTypeCode: [{
            required: true,
            message: '请选择首页类型',
            trigger: 'change'
          }],
          synopsis: [{
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入文章内容',
            trigger: 'blur'
          }],
          categoryValue: [{
            required: true,
            message: '请选择文章类别',
            trigger: 'change'
          }],
        },


        addArticalForm: {
          partnerId: '1',
          categoryValue: '',
          // 宣传图片地址
          thumbPicUrl: '',
          // 缩略图
          promotePicUrl: '',
          title: '',
          author: '',
          showTypeCode: '',
          typeCode: '',
          synopsis: '',
          content: '',
          classifyName: ''
        },
        formLabelWidth: '120px',
        editArticalForm: {
          desc: ''
        },
        dialogAddFormVisible: false,
        dialogEditFormVisible: false,
        currentPage: 1, // 分页
        pageSize: 10, // 分页
        total: 0, // 分页
        // 标题双向绑定
        inputTitle: '',
        bookTitle: '',
        tableData: [],
        // 表单提交验证规则
        rules: {
          desc: [{
            required: true,
            message: '请输入文章内容',
            trigger: 'blur'
          }]
        },
        // 点击编辑文章的id
        articalNameId: ''
      }
    },
    created() {
      this.getArticalList()
    },
    mounted() {},
    destoryed() {},
    methods: {
      changeLocationValue(val) {
        let obj = {};
        obj = this.options.find((item) => {
          return item.value === val;
        });
        this.addArticalForm.classifyName = obj.label
      },
      // 获取企业信息

      handleSizeChange(val) {
        this.pageSize = val;
        this.getArticalList()
      },
      handleCurrentChange(val) {
        // console.log(val);
        this.currentPage = val;
        this.getArticalList()
      },
      // 页面初始化调用函数、
      async getArticalList() {
        let params = {
          pageCurrent: this.currentPage, //页码
          pageLimit: this.pageSize //页大小
        }
        const res = await articleList(params)
        this.tableData = res.data.materialDtoList
        this.total = res.data.resultCount;
      },
      async searchList() {

        if (this.inputTitle == '' && this.bookTitle == '') {
          this.$message.info('请输入正确的文章标题或者书名')
        } else {
          let params = {
            title: this.inputTitle.trim(),
            partnerName: this.bookTitle.trim()
          }
          const res = await articleList(params)
          this.tableData = res.data.materialDtoList
          this.total = res.data.resultCount;
        }

      },
      clearInputCon() {
        this.getArticalList()
      },
      // 删除
      open(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          let params = {
            id: row.id
          }

          const res = await deleteArtical(params)
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          this.getArticalList()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } ,
      // 编辑弹框显示
      editArtical(row) {
        console.log(row);

        this.dialogEditFormVisible = true;
        this.articalNameId = row.materialId
        this.editArticalForm.desc = row.content
      },

      // 提交文章

      submitResult(ruleForm) {
        this.$refs[ruleForm].validate(async (valid) => {
          if (valid) {
            let params = {
              id: this.articalNameId,
              content: this.editArticalForm.desc.replace(/<[^>]+>/g, "")
            }

            const res = await editArtical(params)
            if (res.code == 0) {
              this.$message.success('编辑成功')
            }
            this.dialogEditFormVisible = false;
            this.getArticalList();
            this.$refs[ruleForm].resetFields();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //  dialog弹框关闭触发的事件
      dialogClose(ruleForm) {
        this.$refs[ruleForm].resetFields();
      },

      // 添加文章
      async addArticalList() {
        this.options = []
        this.dialogAddFormVisible = true
        const res = await addArticalList()
        console.log(res);
        res.data.forEach(element => {
          let obj = {}
          obj.value = element.id,
            obj.label = element.categoryName
          this.options.push(obj)
        });
      },

      // 图片上传方法
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

      // 缩略图片上传
      uploadImgList(res, file, fileList) {
        file.url = res.data
        this.imgFileList2(fileList)
      },
      imgFileList2(fileList) {
        if (fileList.length > 0) {
          this.addArticalForm.promotePicUrl = fileList[0].url
        } else {
          this.addArticalForm.promotePicUrl = ''
        }
      },


      uploadImg(res, file, fileList) {
        console.log(fileList);

        file.url = res.data
        this.imgFileList(fileList)
      },
      imgFileList(fileList) {
        if (fileList.length > 0) {
          this.addArticalForm.thumbPicUrl = fileList[0].url
        } else {
          this.addArticalForm.thumbPicUrl = ''
        }
      },
      // 确认添加内容
      addArticalContant(addRuleForm) {
        this.$refs[addRuleForm].validate(async (valid) => {
          if (valid) {
            let params = {
              title: this.addArticalForm.title,
              author: this.addArticalForm.author,
              showTypeCode: this.addArticalForm.showTypeCode,
              typeCode: this.addArticalForm.typeCode,
              synopsis: this.addArticalForm.synopsis,
              content: this.addArticalForm.content.replace(/<[^>]+>/g, ""),
              promotePicUrl: this.addArticalForm.promotePicUrl,
              thumbPicUrl: this.addArticalForm.thumbPicUrl,
              classifyCode: '1',
              categoryId: this.addArticalForm.categoryValue,
              partnerId: '1',
              startTime: this.moment().format('YYYY-MM-DD HH:mm:ss'),
              endTime: this.moment().format('YYYY-MM-DD HH:mm:ss'),
              // classifyName:this.addArticalForm.classifyName
            }
            const res = await addArtical(params)
            if (res.code == 0) {
              this.$message.success('添加成功')
            } else {
              this.$message.info('添加失败')
            }

            this.dialogAddFormVisible = false;
            this.getArticalList();
            this.$refs[addRuleForm].resetFields();

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addDialogClose(addRuleForm) {
        this.$refs[addRuleForm].resetFields();
      }


    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      ...mapGetters(['token'])
    }
  }

</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #EFF2F7;
    padding: 10px;

    .titleInput {
      width: 180px;
    }

    .btn {
      margin-left: 10px;
    }

    .contant {
      float: left;
    }

    .editor {
      float: left;
      margin-left: 5px;
      width: 95%;
    }

    .textarea {
      width: 95%;
      margin-bottom: 20px;
    }

    .intro {
      vertical-align: top;
    }

    .box-card {
      padding: 20px;
    }

    .baseWieth {
      width: 250px;
    }

    .title {
      width: 493px;
    }

    .left {
      float: left;
      width: 50%;
      margin-bottom: 20px;
    }

    .right {
      float: left;
      width: 50%;
      margin-bottom: 20px;

      .advertisingMap {
        float: left;
      }

      .thumbnail {
        margin-left: 70px;
        float: left;
      }

      img {
        width: 120px;
        height: 120px;
      }
    }
  }

</style>
