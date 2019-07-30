<template>
  <div>
    <el-col :span="colspan" :md="colMd" :xs="colXs" :lg="colLg" :offset="offset">
      <el-form-item :label="label" :prop="prop" :required="required" :label-width="labelWidth">
        <el-input
          :value="value"
          @input="$emit('input',$event)"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          :size="size"
          :prefix-icon="prefixIcon"
          :suffix-icon="suffixIcon"
          :rows="rows"
          :class="inputClass"
          :id="inputId"
          :ref="inputRef"
        >
          <div slot="prepend" v-if="prependSlot">
            <slot name="prependSlot"></slot>
          </div>
          <div slot="append" v-if="appendSlot">
            <slot name="appendSlot"></slot>
          </div>
          <!--<el-button type="primary" size="small" slot="append"  @click="handleSlot" v-if="appendSlot">{{appendLabel}}</el-button>-->
        </el-input>
      </el-form-item>
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: '',
    props: {
      prop: {},
      required: {},
      colspan: {default: 7},
      colMd: {default:7},
      colXs:{default:7},
      colSm: {default:7},
      colLg:{default:7},
      offset: {},
      label: {},
      placeholder: {},
      maxlength: {},
      minlength: {},
      size: {},
      prefixIcon:{},
      suffixIcon:{},
      rows: {},
      type: {},
      disabled: {default: false,type: Boolean},
      readonly: {default: false,type: Boolean},
      inputClass: {},
      inputId: {},
      inputRef: {},
      value: {},
      prependSlot:{},
      appendSlot:{},
      labelWidth:{}
    },
    data(){
      return {}
    },
    methods: {
      handleChange: function (event) {
        this.$emit('inputChange',event);
      },
      handleBlur: function (event) {
        this.$emit('inputBlur',event);
      },
      handleFocus: function (event) {
        this.$emit('inputFocus',event);
      }
    }
  }
</script>
