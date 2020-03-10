<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">日期范围:</span>
          <el-date-picker
            v-model="listQuery.time"
            style="width:400px;"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="handleFilter">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="addItem">新增</el-button>
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期" min-width="120">
          </el-table-column>
          <el-table-column prop="title" label="任务标题" min-width="120">
          </el-table-column>
          <el-table-column prop="priority" label="优先级" min-width="120">
          </el-table-column>
          <el-table-column prop="author" label="负责人" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="p-t-20 p-b-10 flex flex-j-end">
        <el-pagination
          :current-page.sync="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <Handle
      v-model="handleInfo"
    />
  </div>
</template>

<script>
    // import { getInfo } from '@/api/user'

    export default {
        name: 'WyglSggl',
        components: {
            Handle: () => import('./Handle.vue'),
        },
        data() {
            return {
                title: '',
                loading: false,
                total: 1,
                listQuery: {
                    time: [],
                    page: 1,
                    limit: 20,
                },
                handleInfo: {
                    visible: false,
                    data: null,
                },
                tableData: [{
                    date: '2019-10-10',
                    title: '市领导视察工作',
                    priority: '高',
                    author: '小张'
                }, {
                    date: '2019-10-10',
                    title: '中秋消防通知安排',
                    priority: '非常高',
                    author: '小白'
                }, {
                    date: '2019-10-10',
                    title: '夏季割草任务安排',
                    priority: '一般',
                    author: '小张'
                }]
            }
        },
        created() {
        },
        mounted() {
        },
        destoryed() {
        },
        methods: {
            // 条件搜索
            handleFilter() {
                this.getList()
            },
            // 切换每页显示条数
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            // 切换当前第几页
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            // 获取列表
            async getList() {
                // this.listLoading = true
                // let data = Object.assign({}, this.listQuery, { startTime: this.listQuery.time[0] }, { endTime: this.listQuery.time[0] })
                // const response = await getPromotionList(this.listQuery)
                // this.listLoading = false
                // let result = response.model
                // if (result) {
                //   this.list = result.records
                //   this.total = result.total
                // }
            },
            // 新增
            addItem() {
                this.handleInfo = {
                    visible: true,
                    type: 'add',
                    data: null,
                }
            },
            // 编辑
            editItem(obj) {
                this.handleInfo = {
                    visible: true,
                    type: 'edit',
                    data: null,
                }
            },
            // 删除
            deleteItem(obj) {
                this.$confirm('确认删除？', '提示', { type: 'warning' }).then(_ => {

                })
                    .catch(_ => {})
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>

