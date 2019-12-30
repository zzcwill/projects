<template>
  <el-container style="height: 100%;">
    <el-aside width="230px">
      <park style="height: 100%;" @change="selectBuilding"></park>
    </el-aside>

    <el-container style="height: 100%;">
      <el-aside width="0px;">
        <el-divider direction="vertical"></el-divider>
      </el-aside>
      <el-container>
        <el-header height="200px">
          <employee @change="changeEmployee"></employee>
        </el-header>
        <el-divider></el-divider>
        <el-main>
          <auth ref="auth" @change="changeAuth"></auth>
        </el-main>
      </el-container>
    </el-container>

    <el-button @click="save">保存</el-button>
  </el-container>
</template>

<script>
  import park from './add/park'
  import employee from './add/employee'
  import auth from './add/auth'
  import { editQx } from '@/api/mjqx/yhsx'
  export default {
    components: { park, employee, auth },
    data() {
      return {
        employees: [],
        doorList: []
      }
    },
    methods: {
      selectBuilding(id) {
        this.$refs.auth.reload(id)
      },
      changeAuth(item) {
        console.log(item)
      },
      changeEmployee(item) {
        this.employees = item
      },
      save() {
        console.log(this.employees)
        let param = []
        if (this.employees) {
          this.employees.forEach(employee => {
            if (this.doorList) {
              this.employees.forEach(item => {
                param.push({
                  terminalId: item.id,
                  parkId: item.parkId,
                  parkName: item.parkName,
                  buildingId: item.buildingId,
                  buildingName: item.buildingName,
                  floorId: item.floorId,
                  floorName: item.floorName,
                  areaId: item.areaId,
                  areaName: item.areaName,
                  option: '1',
                  playerId: employee.id
                })
              })
            }
          })
        }
        let doorList = JSON.stringify(param)
        editQx({ doorList: doorList }).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .el-divider--vertical {
    height: 100%;
  }
</style>
