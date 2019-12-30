<template>
  <div class="dialog">

    <div class="dialog_top">

      <el-card class="box-card">
        <h2>基本设置</h2>
        <div v-for="(item,index) in baseList" :key="index" class="text item">
          <span>{{ item.memo }}</span>
          <span>{{ item.configValue }}</span>
          <el-button @click="open(index,1)">编辑</el-button>
        </div>
      </el-card>
    </div>
    <div class="dialog_bottom">
      <el-card class="box-card">
        <h2>服务设置</h2>
        <div v-for="(item,index) in serverList" :key="index" class="text item">
          <span>{{ item.memo }}</span>
          <span>{{ item.configValue }}</span>
          <el-button @click="open(index,2)">编辑</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  import {
    setInfo,
    modifyItem
  } from '@/api/xtgl/settingInfo'

  export default {
      name: 'XtglXtpz',
    data() {
      return {
        // 基本设置列表
        baseList: [],
        // 服务设置列表
        serverList: [],
        // 弹框中输入框的默认值
        dialogInputVal: '',
        // 选中编辑的每一项的id
        itemId: ''
      }
    },

    created() {
      this.getSettingInfo()
    },

    methods: {
      open(index, type) {
        var item = {}
        if (type === 1) {
          item = this.baseList[index]
          this.dialogInputVal = item.configValue
          this.itemId = item.configKey
        } else {
          item = this.serverList[index]
          this.dialogInputVal = item.configValue
          this.itemId = item.configKey
        }

        this.$prompt('请输入', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.configValue,
        }).then(({ value }) => {
          // 点击确认之后的回调函数
          if (this.dialogInputVal === value) {
            this.$message('两次信息输入的不能一样呦！')
          } else {
            var params = {
              configKey: this.itemId,
              configValue: value
            }
            modifyItem(params).then(res => {
              if (res.code !== 0) {
                this.$message.error('数据更新失败')
              } else {
                this.$message.success('数据更新成功')
                // this.getSettingInfo();
                this.baseList = []
                this.serverList = []
                this.getSettingInfo()
              }
            })
          }
        }).catch(() => {
          // 取消之后的回调函数
        })
      },
      getSettingInfo() {
        setInfo().then(res => {
          if (res.code !== 0) {
            this.$message.error('系统繁忙')
          } else {
            for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].fb1 == '1') {
              this.baseList.push(res.data[i])
            } else {
             this.serverList.push(res.data[i])
            }
          }
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .dialog {
    padding: 50px;

    .box-card {
      .text {
        span:nth-child(2) {
          display: inline-block;
          width: 800px;
           margin: 25px 25px;
          text-align: left;
        }

        span:nth-child(1) {
          display: inline-block;
          font-weight: 700;
          width: 130px;
          text-align: right;
        }

      }
    }

    .dialog_bottom {
      margin-top: 20px;
    }
  }

</style>
