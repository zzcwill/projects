<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
    >
      <el-submenu v-for="item of Object.keys(parkList)" :key="item" :index="item" unique-opened>
        <template slot="title">
          <span>{{ parkList[item].parkName }}</span>
        </template>
        <el-menu-item
          v-for="building in parkList[item].buildingList"
          :key="building.id"
          :index="building.id"
          @click="selectBuilding(building.id)"
        >{{ building.buildingName }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { listBuilding } from '@/api/yqgl/yqxx'

  export default {
    data() {
      return {
        parkList: {}
      }
    },
    created() {
      this.listBuilding()
    },
    methods: {
      selectBuilding(id) {
        if (id === this.showbuildingId) {
          return
        } else {
          this.showbuildingId = id
          this.$emit('change', id)
        }
      },
      listBuilding() {
        listBuilding({ pageLimit: 10000, pageCurrent: 1 }).then(res => {
          res.data.forEach(item => {
            if (this.parkList[item.parkId]) {
              this.parkList[item.parkId].buildingList.push(item)
            } else {
              this.$set(this.parkList, item.parkId, item)
              this.$set(this.parkList[item.parkId], 'buildingList', [item])
            }
          })
        }).catch(err => {
          this.$message.error(err)
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu{
    border-right: 0px;
  }
</style>
