<template>
  <div class="clgl-page" style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">车位编号:</span>
          <el-input v-model="form.parkingCode" placeholder="请输入车位编号"></el-input>
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
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="parkingCode" label="停车位编号牌"></el-table-column>
          <el-table-column prop="parkingTypeName" label="车位类型"></el-table-column>
          <el-table-column prop="parkName" label="所在区域"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              <span v-if="scope.row.statusCode=== '1'" style="color: green">使用中</span>
              <span v-else-if="scope.row.statusCode=== '2'" style="color: red">维修中</span>
              <span v-else-if="scope.row.statusCode=== '3'" style="color: blue">计划中</span>
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
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
          <tcwxx-edit :type="showType" :form="item" :areaValue="areaValue" @save="saveSuccess"></tcwxx-edit>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import tcwxxEdit from './tcwxx-edit'
  import { queryParkingList, deleteParkingDetail, addParkingByExcel, queryParkingDetail } from '@/api/tcgl/tcgl-request'

  export default {
    components: { tcwxxEdit },
    data() {
      return {
        dialogTitle:'',
        form: {
          parkingCode: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        showPreviewDetail: false,
        uploadUrl: '',
        falseFlag: false,
        areaValue: [],
        typeOptions: {
          '1': '小',
          '2': '中',
          '3': '大',
        },
        parkingList: [],
        list: [],
        item: {},
        id: '',
        showDetail: false, // 控制新增窗口弹出
        showType: ''
      }
    },
    created() {
      this.query()
    },
    methods: {
      resetItem() {
        this.item = {
          parkingCode: '',
          parkingTypeCode: '',
          parkingTypeName: '',
          depotId: '',
          depotName: '',
          price: '',
          freeTime: '',
          freeStop: '1',
          pilotDeviceId: '',
          lockDeviceId: '',
          chargeDeviceId: '',
          pilotDeviceModel: '',
          lockDeviceModel: '',
          chargeDeviceModel: '',
          areaId: '',
          haveCharge: '1',
          haveLock: '1',
          havePilot: '1'
        }
      },
      downloadTemplate() {
        window.open('/model/tcw-template.xls')
      },
      doUpload(value) {
        if (value.file.name != '') {
          let reg = /^.*\.(?:xls|xlsx)$/i//文件名可以带空格
          if (!reg.test(value.file.name)) {//校验不通过
            this.$alert('请上传excel格式的文件!', '提示', {
              confirmButtonText: '确定'
            })
            return
          } else {
            let params = new FormData()
            let fileName = value.file.name.split('.').pop()
            fileName = (new Date()).getTime() + '.' + fileName
            params.append('file', value.file, fileName)

            addParkingByExcel(params).then(res => {
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
      show(type, id) {
        if(type=='add'){
          this.dialogTitle='新增'
        }else if(type=='view'){
          this.dialogTitle='查看详情'
        }else{
          this.dialogTitle='修改'
        }
        if (type === 'add') {
          this.resetItem()
        } else {
          queryParkingDetail({ id: id }).then(res => {
            this.item = res.data
            this.areaValue = [this.item.parkId, this.item.floorId, this.item.areaId]
          }).catch(err => {
            this.$message.error(err)
          })
        }
        this.showType = type
        this.showDetail = true
      },
      query() {
        queryParkingList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
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
      del(val) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            id: val
          }
          deleteParkingDetail(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.query()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

