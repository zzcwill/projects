<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" size="mini" label-width="130px" :rules="rules">
      <el-form-item label="分组名称:" prop="groupName">
        <el-input v-model="form.groupName" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="分组编号:" prop="groupCode">
        <el-input v-model="form.groupCode" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item v-if="showSearch || type==='add'" label="上级分组:">
        <search
          type="group"
          show-name="groupName"
          :value="form.parentGroupId"
          :disabled="isView"
          @change="changeSearch"
        >
        </search>
      </el-form-item>
    </el-form>

    <div v-if="!isView" style="text-align: right">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { infoDeviceGroup, addDeviceGroup, editDeviceGroup } from '@/api/sbgl/sbfz'
  import search from '@/components/search'
  export default {
    components: { search },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        showSearch: false,
        form: {
          groupName: '',
          groupCode: '',
          parentGroupId: ''
        },
        rules: {
          groupName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          groupCode: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      changeSearch(item) {
        this.form.parentGroupId = item.id
        this.form.parentGroupName = item.groupName
      },
      query() {
        infoDeviceGroup({ id: this.id }).then(res => {
          this.form = res.data
          this.showSearch = true
        }).catch(err => {
          this.$message.error(err)
        })
      },
      edit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === 'add') {
              addDeviceGroup(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              editDeviceGroup(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
  .el-autocomplete {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
</style>
