<template>
  <div class="fkyy-visitor-detail-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="info-detail">卡编号：1235456261325545</div>
      <div class="flex p-t-10 p-l-10 p-b-10">
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="time" label="刷卡时间"></el-table-column>
          <el-table-column prop="meType" label="读卡器编号"></el-table-column>
          <el-table-column prop="cardType" label="读卡器类型"></el-table-column>
          <el-table-column prop="username" label="用户名称"></el-table-column>
          <el-table-column prop="location" label="位置"></el-table-column>
        </el-table>
      </div>
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
  </div>
</template>

<script>
  import search from '@/components/search'

  export default {
    components: { search },
    data() {
      return {
        form: {
          visitorPhone: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 10
        },
      }
    },
    props: {
      view: Object,
      type: String,
      list: Array
    },
    created() {
      if (this.type === 'view') {
        this.form = this.view
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type !== 'view'
      }
    },
    methods: {
      save() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$emit('save', this.form)
          }
        })
      },
      query() {
        // queryVisitorAppointmentList(this.form).then(res => {
        //   this.list = res.data
        //   this.form.resultCount = res.page.resultCount
        // }).catch(err => {
        //   this.$message.error(err)
        // })
      },
      changePark(val) {
        this.form.parkId = val.id
        this.form.parkName = val.parkName
      },
    }
  }
</script>

<style scoped>
  .info-detail{
    margin-left: 10px;
  }
</style>

