<template>
  <div class="p-10 bg-EFF2F7">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <span class="w-130">所属企业:</span>
          <search
            type="partner"
            show-name="partnerName"
            :value="form.partnerId"
            @change="changePartner"
          >
          </search>
        </div>
        <div class="flex-center w-fit-content" style="margin-left: 20px;">
          <span class="w-130">部门名称:</span>
          <el-input v-model="form.orgName" placeholder="请输入部门名称"></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" class="m-l-20" @click="doQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="m-l-20" @click="show('add')">新增</el-button>
      </div>
      <div>
        <el-table
          border
          :data="list"
          tooltip-effect="dark"
        >
          <el-table-column prop="partnerName" label="所属企业名称"></el-table-column>
          <el-table-column prop="superiorOrgName" label="上级部门名称"></el-table-column>
          <el-table-column prop="orgName" label="部门名称"></el-table-column>
          <el-table-column prop="contactName" label="部门联系人"></el-table-column>
          <el-table-column prop="contactTelephone" label="部门联系人电话"></el-table-column>
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
        <edit @save="save" :type="showType" :id="showId"></edit>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { organizationList, delOrganization } from '@/api/qygl/jgbm'
  import edit from './edit'
  import search from '@/components/search'
  export default {
    components: { edit, search },
    data() {
      return {
        dialogTitle:'',
        showAdd: false,
        showType: '',
        showId: '',
        list: [],
        form: {
          partnerId: '',
          orgName: '',
          pageCurrent: 1,
          pageLimit: 10,
          resultCount: 0
        }
      }
    },
    created() {
      this.query()
    },
    methods: {
      changePartner(item) {
        this.form.partnerId = item.id
      },
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
        organizationList(this.form).then(res => {
          this.list = res.data
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
         delOrganization({ id: id }).then(res => {
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

