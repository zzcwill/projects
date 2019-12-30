<template>
  <div style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label class="w-130">区域名称：</label>
          <el-input v-model="form.areaName" placeholder="请输入"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="clickSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :data="list"
          tooltip-effect="dark"
          border
        >
          <el-table-column prop="areaName" label="区域名称"></el-table-column>
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="buildingName" label="所属楼栋"></el-table-column>
          <el-table-column prop="floorName" label="所属楼层"></el-table-column>
          <el-table-column label="状态">
            <div slot-scope="scope">
              {{ areaTxt [scope.row.stateCode] }}
            </div>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改</el-button>
              <el-button type="text" size="mini" @click="close(scope.row.id)">关闭</el-button>
            </div>
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
      >
        <div style="width: 100%">
          <detail :id="showId" :type="showType" @save="save"></detail>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getAreaList, closeqystate } from '@/api/yqgl/qyxx'
  import detail from './detail'

  export default {
    components: { detail },
    data() {
      return {
        showId: '',
        showDetail: false,
        showType: 'add',
        form: {
          areaName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        loading: false,
        //获取区域信息参数
        areaTxt: {
          '0': '空置中',
          '1': '使用中',
          '2': '装修中'
        }
      }
    },
    created() {
      //发起请求
      this.query()
    },

    methods: {
      clickSearch() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        getAreaList(this.form).then(res => {
          this.list = res.data
        }).catch(err => {
          this.$message.error(err)
        })
      },
      show(type, id) {
        this.showType = type
        this.showDetail = true
        this.showId = id
      },
      close(id) {
        let param = {
          id: id,
          stateCode: '0'
        }
        closeqystate(param).then(res => {
          this.query()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      save() {
        this.showDetail = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
