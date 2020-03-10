<template>
  <div style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label style="width: 160px;">会议室名称：</label>
          <el-input v-model="form.conferenceName" placeholder="请输入会议室名称"></el-input>
        </div>
        <div class="flex-center w-fit-content">
          <label style="margin-left: 50px">状态：</label>
          <el-select v-model="modelName" placeholder="请选择" @change="changeItem" style="width: 250px">
            <el-option
              v-for="item in options"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="clickSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          border

        >
          <el-table-column prop="conferenceCode" label="会议室编号"></el-table-column>
          <el-table-column prop="conferenceName" label="会议室名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="areaName" label="区域"></el-table-column>
          <el-table-column prop="area" label="会议室面积">
            <template slot-scope="scope">
              {{scope.row.area}} 平方
            </template>
          </el-table-column>
          <el-table-column prop="containNum" label="可容纳人数">
            <template slot-scope="scope">
              {{scope.row.containNum}} 人
            </template>
          </el-table-column>
          <el-table-column prop="" label="审核方式">自动审核</el-table-column>
          <el-table-column prop="statusCode" label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.statusCode==='1'" style="color: #78879C">未启用</div>
              <div v-else-if="scope.row.statusCode==='2'" style="color:green">已启用</div>
              <div v-else-if="scope.row.statusCode==='3'" style="color: red">已禁用</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="220px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">编辑</el-button>
              <el-button type="text" size="mini" v-if="isForbid(scope.row.statusCode)"
                         @click="startUsing(scope.row.id)">
                启用
              </el-button>
              <el-button type="text" size="mini" v-if="isStartUsed(scope.row.statusCode)"
                         @click="stopUsing(scope.row.id)">停用
              </el-button>
              <el-button type="text" size="mini" @click="deploy(scope.row)">配置</el-button>
              <el-button type="text" v-if="!isStartUsed(scope.row.statusCode)" size="mini" @click="del(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class=" p-b-10 flex flex-j-end">
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
        <detail :id="showId" :type="showType" @save="save"></detail>
      </el-dialog>
    </div>
    <!--配置页面组件-->
    <div v-if="showDeployDetail">
      <el-dialog
        :visible.sync="showDeployDetail"
        width="60%"
        :title='dialogTitle'
      >
        <deploy-detail @save="saveDeploy" :form="deployDetail" :equipmentList="equipmentList"></deploy-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getConferenceList, delConference, conferenceDeviceList, checkConferenceInfo } from '@/api/hysgl/hysgl'
  import detail from './detail'
  import deployDetail from './deploy-detail'

  export default {
    components: { detail, deployDetail },
    data() {
      return {
        showDeployDetail: false,
        dialogTitle: '',
        showId: '',
        deployDetail: {},
        showDetail: false,
        showType: 'add',
        options: ['未启用', '已启用', '已禁用'],
        modelName: '',
        form: {
          conferenceName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        equipmentList: [],
        loading: false
      }
    },
    created() {
      this.query()
    },
    computed: {},
    methods: {
      isStartUsed(status) {
        return status === '2'
      },
      isNotUsed(status) {
        return status === '1'
      },
      isForbid(status) {
        return status === '3'
      },
      // 启用
      startUsing(id) {
        this.$confirm('确认启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          checkConferenceInfo({ id: id, statusCode: '2', statusName: '已启用' }).then(res => {
            this.query()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        })
      },
      // 停用
      stopUsing(id) {
        this.$confirm('确认停用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          checkConferenceInfo({ id: id, statusCode: '3', statusName: '已停用' }).then(res => {
            if (res.data.fb1 !== '0' || res.data.fb2 !== '0') {
              this.$message({
                message: '操作失败：' + res.msg,
                type: 'warning'
              })
            } else {
              this.query()
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            }
          })

        })
      },
      // 配置
      deploy(item) {
        // 查询设备详情
        conferenceDeviceList({ conferenceId: item.id }).then(res => {
          this.equipmentList = []
          if (res.data) {
            this.equipmentList = res.data
          }
          this.deployDetail = item
          this.showDeployDetail = true
          this.dialogTitle = '会议室配置'
        })
      },
      // 配置成功返回
      saveDeploy() {
        this.showDeployDetail = false
        this.$message({
          type: 'success',
          message: '操作成功!(接口待补充)'
        })
      },
      // select获得选中项事件
      changeItem(val) {
      },
      clickSearch() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        getConferenceList(this.form).then(res => {
          this.list = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        if (type == 'add') {
          this.dialogTitle = '新增'
        } else if (type == 'view') {
          this.dialogTitle = '查看'
        } else {
          this.dialogTitle = '修改'
        }
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      save() {
        this.showDetail = false
        this.query()
      },
      del(id) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let param = { id: id }
          delConference(param).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.query()
          }).catch(err => {
            this.$message.error(err)
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>

