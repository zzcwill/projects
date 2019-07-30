<template>
  <div id="cd_select">
    <el-col :span="colSpan" :md="colMd" :xs="colXs" :sm="colSm" :lg="colLg" :offset="offset">
      <el-form-item :label="label" :prop="prop" :label-width="labelWidth">
        <el-select :value="value" @input="change($event)" @change="handleChange" @remove-tag="handleRemove"
                   :multiple="multiple"
                   :disabled="disabled"
                   :size="size"
                   :placeholder="placeholder"
                   filterable
        >
          <el-option v-for="item in options" :label="item.label" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: '',
    props: {
      prop: {},
      options: {type: Array},
      label: {},
      labelWidth: {},
      value:'',
      colSpan: {},
      colLg: {default:7,type:Number},
      colMd: {default:7,type:Number},
      colSm: {default:7,type:Number},
      colXs: {default:7,type:Number},
      offset: {},
      multiple: {default:false},
      disabled: {default:false},
      size: {},
      placeholder: {default:'请选择'}
    },
    data(){
    return {

    }
  },
  components: {},
  methods: {
    change(val) {
      this.$emit('input', val);
    },
    handleChange(val){
      this.$emit('selectChange',val)
    },
    handleRemove(tagValue){
      this.$emit('removeTag',tagValue)
    }
  },
  mounted(){

  }
  }
</script>

<style>

</style>
