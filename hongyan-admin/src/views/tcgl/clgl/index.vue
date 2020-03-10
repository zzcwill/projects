<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">车牌编号:</span>
          <el-input v-model="form.carNumber" placeholder="请输入车牌编号"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
        <el-upload
          ref="upload"
          :action="uploadUrl"
          class="upload-demo"
          :show-file-list="falseFlag"
          :http-request="doUpload"
        >
          <el-button size="small" type="primary" class="m-l-10">文件导入</el-button>
        </el-upload>
        <el-button size="small" type="primary" class="m-l-10" @click="downloadTemplate()">模板下载</el-button>
      </div>

      <div>
        <el-table :data="list" border tooltip-effect="dark">
          <el-table-column prop="carNumber" label="车牌"></el-table-column>
          <el-table-column prop="userName" label="所属员工"></el-table-column>
          <el-table-column prop="userPhone" label="员工电话"></el-table-column>
          <el-table-column prop="companyName" label="所属部门"></el-table-column>
          <el-table-column prop="color" label="车辆颜色"></el-table-column>
          <el-table-column prop="carLoad" label="车辆载重"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'" style="color: blue">申请中</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: green">已通过</span>
              <span v-else-if="scope.row.statusCode=== '3'" style="color: red">拒绝</span>
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="mini" @click="deleteThis(scope.row.id)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="p-t-20 p-b-10 flex flex-j-end">
          <el-pagination
            :current-page.sync="form.pageCurrent"
            :page-sizes="[10,20,30,50]"
            :page-size.sync="form.pageLimit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.resultCount"
            @size-change="query"
            @current-change="query"
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="showDetail">
        <el-dialog
          :visible.sync="showDetail"
          width="80%"
          :title='dialogTitle'
        >
          <clgl-edit :id="showId" :type="showType" @save="saveSuccess"></clgl-edit>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import clglEdit from './clgl-edit'
  import { deleteCarInfo, queryCarInfoList, addCarInfoByExcel } from '@/api/tcgl/tcgl-request'

  export default {
    components: { clglEdit },
    data() {
      return {
        dialogTitle:'',
        form: {
          parkingCode: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        carList: [],
        id: '',
        uploadUrl: '',
        falseFlag: false,
        showDetail: false, // 控制新增窗口弹出
        showType: '',
        showId: ''
      }
    },
    created() {
      this.query()
    },
    methods: {
      downloadTemplate() {
        window.open('/model/car-template.xls')
      },
      doUpload(value) {
        if (value.file.name !== '') {
          let reg = /^.*\.(?:xls|xlsx)$/i//文件名可以带空格
          if (!reg.test(value.file.name)) { //校验不通过
            this.$alert('请上传excel格式的文件!', '提示', {
              confirmButtonText: '确定'
            })
            return
          } else {
            let params = new FormData()
            let fileName = value.file.name.split('.').pop()
            fileName = (new Date()).getTime() + '.' + fileName
            params.append('file', value.file, fileName)

            addCarInfoByExcel(params).then(res => {
              this.$refs.upload.clearFiles()
              this.$message({
                type: 'success',
                message: '导入成功!'
              })
              this.doQuery()
            }).catch(err => {
              this.$refs.upload.clearFiles()
              this.$message.error(err)
            })
          }
        }
      },
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        queryCarInfoList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
         if(type=='add'){
          this.dialogTitle='新增'
        }else if(type=='view'){
          this.dialogTitle='查看详情'
        }else{
          this.dialogTitle='修改'
        }
        this.showType = type
        this.showId = id
        this.showDetail = true
      },
      saveSuccess() {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.showDetail = false
        this.showPreviewDetail = false
        this.query()
      },
      deleteThis(val) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          deleteCarInfo(params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.query()
          }).catch(err => {
            this.$message.error(err)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .clgl-page {
    .el-form-item {
      margin-top: 10px !important;
    }
  }
</style>

