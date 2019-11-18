<template>
  <select v-model='value' class="Choose" :disabled='disabledData' @change='goChoose($event)'>
    <option v-for="(item, index) in optionArrData" :key="index" v-bind:value="item">{{item}}</option>
  </select>
</template>

<script>
export default {
  name: 'Choose',
  props: {
    valueData: {
      type: String,
      default: ''
    },
    optionArrData: {
      type: Array,
      default: []
    },
    disabledData: {
      type: Boolean,
      default: false     
    },
    callBack: {
      type: Function,
      default: () =>{

      }
    },
    indexData: {
      type: Number,
      default: 0     
    },
    indexData2: {
      type: Number,
      default: 0    
    }    
  },
  data() {
    return {
      value: this.valueData
    }
  },
  mounted() {},
  methods: {
    goChoose(event) {
      let key = this.indexData;
      console.info(this.indexData)
      console.info(this.indexData2)
      let key2 = this.indexData2;
      this.$emit('callBack', key,key2,event.currentTarget.value)
    }
  }
}
</script>

<style lang="less">

</style>
