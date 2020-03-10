<template>
  <div>
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
    </el-container>
    <div style="text-align: right;padding-top: 20px;">
      <el-button @click="save" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
  import park from '../components/park'
  import employee from './add/employee'
  import auth from '../components/auth'
  import { editQyQx } from '@/api/mjqx/yhsx'
  export default {
    components: { park, employee, auth },
    data() {
      return {
        employees: [],
        form: {}
      }
    },
    methods: {
      selectBuilding(id) {
        this.$refs.auth.reload(id)
      },
      changeAuth(item) {
        this.form = item
      },
      changeEmployee(item) {
        this.employees = item
      },
      save() {
        let param = []
        let liftParam = []
        if (this.employees) {
          this.employees.forEach(employee => {
            if (this.form.floor) {
              this.form.floor.forEach(item => {
                param.push({
                  terminalId: item.id,
                  terminalNo: item.terminalNo,
                  terminalName: item.terminalName,
                  terminalTypeCode: item.terminalTypeCode,
                  terminalTypeName: item.terminalTypeName,
                  terminalModel: item.terminalModel,
                  terminalStatesCode: item.terminalStatesCode,
                  terminalStatesName: item.terminalStatesName,
                  parkId: item.parkId,
                  parkName: item.parkName,
                  buildingId: item.buildingId,
                  buildingName: item.buildingName,
                  floorId: item.floorId,
                  floorName: item.floorName,
                  areaId: item.areaId,
                  areaName: item.areaName,
                  option: '1',
                  partnerId: employee.id,
                  partnerName: employee.partnerName,
                  contactName: employee.contactName,
                  contactTelephone: employee.contactTelephone
                })
              })
            }

            if (this.form.lifts) {
              this.form.lifts.forEach(item => {
                liftParam.push({
                  terminalId: item.id,
                  terminalNo: item.terminalNo,
                  terminalName: item.terminalName,
                  terminalTypeCode: item.terminalTypeCode,
                  terminalTypeName: item.terminalTypeName,
                  terminalModel: item.terminalModel,
                  terminalStatesCode: item.terminalStatesCode,
                  terminalStatesName: item.terminalStatesName,
                  parkId: item.parkId,
                  parkName: item.parkName,
                  buildingId: item.buildingId,
                  buildingName: item.buildingName,
                  floorId: item.floorId,
                  floorName: item.floorName,
                  areaId: item.areaId,
                  areaName: item.areaName,
                  option: '1',
                  partnerId: employee.id,
                  partnerName: employee.partnerName,
                  contactName: employee.contactName,
                  contactTelephone: employee.contactTelephone
                })
              })
            }
          })
        }

        let qxList = JSON.stringify(param)
        let liftList = JSON.stringify(liftParam)
        editQyQx({ doorList: qxList, liftList: liftList }).then(res => {
          this.$message({
            message: '权限新增成功',
            type: 'success',
          })
          this.$emit('reload')
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
