<template>
  <el-dialog
    title="查看投诉信息"
    :visible="info.visible"
    custom-class="default-dialog-style"
    width="1000px"
    @update:visible="close"
    @open="open"
  >
    <div>
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="投诉人：">{{ info.data.proposeName }}</el-form-item>
        <el-form-item label="提交时间：">{{ info.data.createTime }}</el-form-item>
        <el-form-item label="状态：">{{ info.data.statusName }}</el-form-item>
        <el-form-item label="投诉内容：">
          {{ info.data.proposeContent }}
          <!-- <el-table
            :border="true"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="title" label="名称" min-width="120">
            </el-table-column>
            <el-table-column prop="content" label="内容" min-width="120">
            </el-table-column>
            <el-table-column prop="time" label="时间" min-width="120">
            </el-table-column>
          </el-table> -->
        </el-form-item>
        <el-form-item label="回复内容：">
          <el-input v-model="ruleForm.anwser" type="textarea" :autosize="{ minRows: 4, maxRows: 5 }"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addOrEdit } from '@/api/zhfw/tsjy'
export default {
  name: 'TsjyLookDetail',
  model: {
    prop: 'info',
    event: 'update',
  },
  props: {
    info: {
      type: Object,
      default: () => ({ visible: false, data: {}})
    }
  },
  data() {
    return {
      btnLoading: false,
      data: {},
      ruleForm: {
        anwser: '',
      },
      tableData: [{
        title: '测试名称',
        content: '娃儿45345345345354',
        time: '2019-99-99'
      }]
    }
  },
  methods: {
    close() {
      this.ruleForm.anwser = ''
      let obj = this._.cloneDeep(this.info)
      obj.visible = false
      this.$emit('update', obj)
    },
    open() {
        let data = this.info.data
        this.data = data
        // this.ruleForm.isReal = data.isReal
    },
    sure() {
      this.btnLoading = true
      let obj = Object.assign({}, this.data, { replyContent: this.ruleForm.anwser })
      addOrEdit(obj).then((data) => {
        this.btnLoading = false
        if (data.code === 0) {
          this.close()
          this.$message.success(this.info.type !== 'add' ? '修改成功' : '添加成功')
          this.$emit('reflash')
        } else {
          this.$message.error(data.msg)
        }
      }).catch(() => {
        this.btnLoading = false
        this.$message.error('添加失败')
      })
    }
  }
}
</script>
