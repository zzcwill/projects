<template>
  <div class="btn-search-group">
    <el-col :sapn="span" :md="colMd" :xs="colXs" :sm="colSm" :lg="colLg" style="margin-bottom: 20px;text-align: center">
      <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
      <el-button size="small" icon="el-icon-error" @click="handleResetForm">清除查询条件</el-button>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: '',
    props:{
      span: {},
      colMd: {default:24,type:Number},
      colXs: {default:24,type:Number},
      colSm: {default:24,type:Number},
      colLg: {default:24,type:Number}
    },
    data(){
      return {}
    },
    methods: {
      handleSearch(){
        this.$emit('search');
      },
      handleResetForm(){
        this.$emit('reset');
      }
    }
  }
</script>
