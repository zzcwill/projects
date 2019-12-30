<template>
  <div class="flex">
    <div class="flex1 p-r-20">
      <el-select :value="category" class="w-100" placeholder="请选择" @input="val => $emit('update', val)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-button size="small" type="primary" @click="visible = true">添加分类</el-button>
    <el-dialog
      width="30%"
      title="添加分类"
      :visible.sync="visible"
      custom-class="default-dialog-style"
      append-to-body
    >
      <div class="flex-center">
        <span>分类名称：</span>
        <el-input v-model.trim="name" class="flex1"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="visible = false">返回</el-button>
        <el-button size="medium" type="primary" @click="sure">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'WytgAddCategory',
  model: {
    prop: 'category',
    event: 'update'
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      // category: '', // 类别
      name: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods: {
    sure() {
      this.visible = false
    },
    updates(val) {
      console.log(val)
    }
  }
}
</script>
