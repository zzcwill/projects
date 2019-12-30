<template>
  <div>
    <div v-if="floorList">
      <p>电梯权限</p>
      <div style="width: 80px;float: left;">
        <span>层数：</span>
      </div>
      <div>
        <el-checkbox v-for="item in Object.keys(floorList)" :key="item">
          {{ floorList[item].floorName }}
        </el-checkbox>
      </div>
    </div>

    <div v-if="floorList">
      <div v-for="item in Object.keys(floorList)" :key="item">
        <el-divider></el-divider>
        <span>{{ floorList[item].floorName }}权限</span>
        <div v-for="area in floorList[item].areaList" :key="area.id">
          <br>
          <div style="width: 80px;float: left;">
            <span>{{ area.areaName }}: </span>
          </div>
          <div>
            <el-checkbox
              v-for="deviceItem in device[area.id]"
              :key="deviceItem.id"
              @change="changeDevice(deviceItem)"
            >
              {{ deviceItem.deviceName }}
            </el-checkbox>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAreaList } from '@/api/yqgl/qyxx'
  import { listDeviceAreaInstall } from '@/api/sbgl/sbaz'
  export default {
    data() {
      return {
        floorList: {},
        device: {}
      }
    },
    methods: {
      reload(id) {
        this.floorList = {}
        this.device = {}
        this.listFloor(id)
        this.listDevice(id)
      },
      listFloor(id) {
        getAreaList({ pageLimit: 10000, pageCurrent: 1, buildingId: id }).then(res => {
          if (res.data) {
            res.data.forEach(item => {
              if (this.floorList[item.floorId]) {
                this.floorList[item.floorId].areaList.push(item)
              } else {
                this.$set(this.floorList, item.floorId, item)
                this.$set(this.floorList[item.floorId], 'areaList', [item])
              }
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      listDevice(id) {
        listDeviceAreaInstall({ pageLimit: 10000, pageCurrent: 1, buildingId: id }).then(res => {
          if (res.data) {
            res.data.forEach(item => {
              if (this.device[item.areaId]) {
                this.device[item.areaId].push(item)
              } else {
                this.$set(this.device, item.areaId, [item])
              }
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      changeDevice(item) {
        this.$emit('change', item)
      },
      save() {

      }
    }
  }
</script>

<style scoped>

</style>
