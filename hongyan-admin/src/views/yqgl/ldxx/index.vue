<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label class="w-130">园区名称：</label>
          <el-input v-model="form.parkName" placeholder="请输入园区名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="clickSearch">搜索</el-button>
<!--        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>-->
      </div>
      <div>
        <el-table v-loading.body="loading" :data="list" tooltip-effect="dark" border style="width: 100%">
          <el-table-column prop="parkName" label="所属园区"></el-table-column>
          <el-table-column prop="buildingName" label="所属楼栋"></el-table-column>
          <el-table-column prop="floorName" label="楼层名称"></el-table-column>
          <el-table-column prop="stateName" label="状态"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">修改平面图</el-button>
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
        width="70%"
      >
        <div style="width: 100%">
          <detail :id="showId" :type="showType" @save="save"></detail>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { listFloor } from '@/api/yqgl/yqxx'
  import detail from './detail'
  export default {
    components: { detail },
    data() {
      return {
        showId: '',
        showDetail: false,
        showType: 'add',
        form: {
          parkName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        list: [],
        loading: false
      }
    },
    created() {
      this.query()
    },
    methods: {
      clickSearch() {
        this.form.pageCurrent = 1
        this.query()
      },
      query() {
        listFloor(this.form).then(res => {
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
      save() {
        this.showDetail = false
        this.query()
      }
    }

  }
</script>

<style scoped>

</style>
