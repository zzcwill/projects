<template>
  <el-autocomplete
    v-model="showValue"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="true"
    :disabled="disabled"
    @select="handleSelect"
    @blur="changeValue"
  >
    <template slot-scope="{ item }">
      <div class="name">{{ item[showName] }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
  import { searchAll } from '@/api/commonApi'
  export default {
    props: {
      type: String,
      showName: String,
      valueName: {
        type: String,
        default: 'id'
      },
      queryData: Object,
      value: String,
      disabled: Boolean
    },
    data() {
      return {
        restaurants: [],
        showValue: '',
        item: {}
      }
    },
    created() {
      this.loadAll()
    },
    methods: {
      querySearch(queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant[this.showName].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {
        searchAll(this.type, this.queryData).then(res => {
          this.restaurants = res.data
          this.restaurants.forEach((item) => {
            if (item[this.valueName] === this.value) {
              this.handleSelect(item)
            }
          })
        }).catch(err => {
          this.$message.error(err)
          this.restaurants = []
        })
      },
      handleSelect(item) {
        if (item) {
          this.showValue = item[this.showName]
        }
        this.item = item
        this.$emit('change', item)
      },
      delValue() {
        this.showValue = ''
        let item = {}
        this.handleSelect(item)
      },
      changeValue() {
        if (this.item) {
          if (this.item[this.showName] !== this.showValue) {
            this.delValue()
          }
        } else {
          this.delValue()
        }
      }
    }
  }
</script>

<style scoped>

</style>
