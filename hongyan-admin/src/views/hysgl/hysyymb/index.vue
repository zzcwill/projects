<template>
  <div style="padding:30px;">
    <div class="p-10 bg-white brs-4 def-shadow">
      <div class="flex p-t-10 p-l-10 p-b-10">
        <div class="flex-center w-fit-content">
          <label style="width: 270px;">模板名称：</label>
          <el-input v-model="form.meetingTitle" placeholder="请输入模板名称"></el-input>
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
          <!--<el-table-column prop="id" label="模板编号"></el-table-column>-->
          <el-table-column prop="modelName" label="模板名称"></el-table-column>
          <el-table-column prop="meetingTitle" label="会议主题"></el-table-column>
          <el-table-column prop="meetingDescribe" label="会议说明"></el-table-column>
          <el-table-column prop="conferenceNum" label="会议人数"></el-table-column>

          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="show('view',scope.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="show('edit',scope.row.id)">编辑</el-button>
              <el-button type="text" size="mini" @click="del(scope.row.id)">删除</el-button>
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
        width="50%"
        :title='dialogTitle'
      >
        <detail :id="showId" :type="showType" :form="modelDetail" :peopleList="modelPeopleDetail"
                :peopleListTag="peopleListTag"
                @save="save"></detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {
    getConferenceModelList,
    delConferenceModel,
    queryConferenceModelDetail,
    queryConferenceModelPeopleDetail
  } from '@/api/hysgl/hysyymb'
  import detail from './detail'

  export default {
    components: { detail },
    data() {
      return {
        dialogTitle:'',
        showId: '',
        showDetail: false,
        showType: 'add',
        modelDetail: {},
        modelPeopleDetail: [],
        peopleListTag: [],
        form: {
          meetingTitle: '',
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
      queryModelPeopleDetail(type, id) {
        this.peopleListTag = []
        this.modelPeopleDetail = []
        queryConferenceModelPeopleDetail({ modelId: id }).then(res => {
          if (res.data !== undefined) {
            this.modelPeopleDetail = res.data
            for (let i = 0; i < this.modelPeopleDetail.length; i++) {
              this.peopleListTag.push(this.modelPeopleDetail[i].userName)
            }
          }
          console.log(this.peopleListTag)
          this.showType = type
          this.showDetail = true
          this.showId = id
        }).catch(err => {
          this.$message.error(err)
        })
      },
      query() {
        getConferenceModelList(this.form).then(res => {
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
          this.dialogTitle='查看'
        }else{
          this.dialogTitle='编辑'
        }
        if (type === 'add') {
          this.modelDetail = {
            modelName: '',
            meetingTitle: '',
            meetingDescribe: '',
            conferenceNum: ''
          }
          this.modelPeopleDetail = []
          this.peopleListTag = []
          this.showType = type
          this.showDetail = true
          this.showId = id
        } else {
          queryConferenceModelDetail({ id: id }).then(res => {
            this.modelDetail = res.data
            this.queryModelPeopleDetail(type, id)
          }).catch(err => {
            this.$message.error(err)
          })
        }

      },
      save() {
        this.showDetail = false
        this.query()
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      },
      del(id) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'btn-custom-cancel',
          type: 'warning'
        }).then(() => {
          let param = { id: id }
          delConferenceModel(param).then(res => {
            this.query()
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
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

