<template>
  <div>
    <div v-if="floorList&& floorDevice.length>0">
      <p>电梯权限</p>
      <div style="width: 80px;float: left;">
        <span>层数：</span>
      </div>
      <div>
        <el-checkbox
          v-for="(item, index) in Object.keys(floorList)"
          :key="index"
          :name="item"
          @change="changeFloor"
        >
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
              :name="JSON.stringify(deviceItem)"
              @change="changeDevice"
            >
              {{ deviceItem.terminalNo }}
            </el-checkbox>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getAreaList } from '@/api/yqgl/qyxx'
  import { listDevice } from '@/api/mjqx/yhsx'
  export default {
    data() {
      return {
        floorList: {},
        floorDevice: [],
        device: {},
        floors: {},
        lifts: {},
        form: {
          floor: [],
          lifts: []
        }
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
        listDevice({ pageLimit: 10000, pageCurrent: 1, buildingId: id }).then(res => {
          if (res.data) {
            res.data.forEach(item => {
              if (item.terminalTypeCode === '3') { // 门禁
                if (this.device[item.areaId]) {
                  this.device[item.areaId].push(item)
                } else {
                  this.$set(this.device, item.areaId, [item])
                }
              } else if (item.terminalTypeCode === '2') { //电梯
                this.floorDevice.push(item)
              }
            })
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      changeFloor(value, e) {
        if (value) {
          this.floors[e.target.name] = this.floorList[e.target.name]
        } else {
          this.floors[e.target.name] = undefined
        }
        this.change()
      },
      changeDevice(value, e) {
        if (value) {
          let name = JSON.parse(e.target.name)
          this.lifts[name.id] = name
        } else {
          let name = JSON.parse(e.target.name)
          this.lifts[name.id] = undefined
        }
        this.change()
      },
      change() {
        this.form.floor = []
        for (let key of Object.keys(this.floors)) {
          if (this.floors[key] && this.floorDevice.length > 0) {
             for (let item of this.floorDevice) {
               item.floorId = this.floors[key].floorId
               item.floorName = this.floors[key].floorName
               this.form.floor.push(item)
             }
          }
        }
        this.form.lifts = []
        for (let key of Object.keys(this.lifts)) {
          if (this.lifts[key]) {
            this.form.lifts.push(this.lifts[key])
          }
        }
        this.$emit('change', this.form)
      }
    }
  }
</script>

<style scoped>

</style>
