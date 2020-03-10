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
      </div>
      <div>
        <el-table
          v-loading.body="loading"
          :border="true"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="companyName" label="公司名称" min-width="120">
          </el-table-column>
          <el-table-column prop="areaName" label="所属区域" min-width="120">
          </el-table-column>
          <el-table-column prop="propertyCosts" label="物业计费金额" min-width="120">
          </el-table-column>
          <el-table-column prop="statisticalTimeStart" label="开始时间" min-width="120">
          </el-table-column>
          <el-table-column prop="statisticalTimeEnd" label="结束时间" min-width="120">
          </el-table-column>
          <el-table-column prop="stateName" label="缴费状态" min-width="120">
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="primary" size="mini" @click="editItem(scope.row)">详情</el-button>
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
                    companyName: 'A企业',
                    areaName: '806',
                    propertyCosts: '200',
                    statisticalTimeStart: '2019-12-01',
                    statisticalTimeEnd: '2019-12-31',
                    stateCode: 1,
                    stateName: '未缴纳'
                }, {
                    companyName: 'B企业',
                    areaName: '807',
                    propertyCosts: '200',
                    statisticalTimeStart: '2019-12-01',
                    statisticalTimeEnd: '2019-12-31',
                    stateCode: 2,
                    stateName: '已缴纳'
                }, {
                    companyName: 'C企业',
                    areaName: '808',
                    propertyCosts: '200',
                    statisticalTimeStart: '2019-12-01',
                    statisticalTimeEnd: '2019-12-31',
                    stateCode: 1,
                    stateName: '未缴纳'
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
                    data: obj,
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

