<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">企业名称:</span>
          <el-input v-model="form.partnerName" placeholder="请选择企业名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          border
          :data="partnerList"
          tooltip-effect="dark"
        >
          <el-table-column prop="partnerCode" label="企业编号"></el-table-column>
          <el-table-column prop="partnerName" label="企业名称"></el-table-column>
          <el-table-column prop="superiorName" label="上级企业名称"></el-table-column>
<!--          <el-table-column prop="examineState" label="审核状态">-->
<!--            <template slot-scope="scope">-->
<!--              <span>{{ examineStateOption[scope.row.examineState] }}</span>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <div slot-scope="scope">
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">编辑</el-button>
              <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
            </div>
          </el-table-column>
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

    <div v-if="showAdd">
      <el-dialog
        :visible.sync="showAdd"
        width="80%"
        :title='dialogTitle'
      >
        <qyxx-edit @save="save" :type="showType" :id="showId"></qyxx-edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { partnerList, delPartner } from '@/api/qygl/qyxx'
  import qyxxEdit from './edit'
  export default {
    components: { qyxxEdit },
    data() {
      return {
        dialogTitle:'',
        showAdd: false,
        showType: '',
        showId: '',
        partnerList: [],
        form: {
          partnerName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        },
        examineStateOption: {
          '1': '未审核',
          '2': '审核中',
          '3': '审核未通过',
          '4': '审核通过',
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      doQuery() {
        this.form.pageCurrent = 1
        this.query()
      },
      show(type, id) {
        if(type=='add'){
          this.dialogTitle='新增'
        }else{
          this.dialogTitle='编辑'
        }
        this.showType = type
        this.showId = id
        this.showAdd = true
      },
      query() {
        partnerList(this.form).then(res => {
          this.partnerList = res.data
          this.form.resultCount = res.page.resultCount
        }).catch(err => {
          this.$message.error(err)
        })
      },
      del(id) {

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delPartner({ id: id }).then(res => {
          this.query()
        }).catch(err => {
          this.$message.error(err)
        })
        this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      save() {
        this.showAdd = false
        this.query()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

