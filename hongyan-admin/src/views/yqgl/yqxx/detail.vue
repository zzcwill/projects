<template>
  <div>
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          :rules="rules"
          size="mini"
          label-width="120px"
          :disabled="isView"
        >
          <el-form-item label="园区名称:" prop="parkName">
            <el-input v-model="form.parkName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="选择地址:" style="margin-left: 200px" :disabled="false">
            <el-button type="text" :disabled="false" @click="addrDialogVisible = true">查看地址</el-button>
          </el-form-item>
          <br>
          <el-form-item label="园区地址:" prop="addr">
            <el-input v-model="form.addr" style="width: 200px" disabled></el-input>
          </el-form-item>
          <el-form-item label="园区联系人:" style="margin-left: 200px" prop="contactName">
            <el-input v-model="form.contactName" style="width: 200px"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="详细地址:" prop="parkAddrress">
            <el-input v-model="form.parkAddrress" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="园区联系人电话:" style="margin-left: 200px" prop="contactTelephone">
            <el-input v-model="form.contactTelephone" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog
        title="选择地址"
        :visible.sync="addrDialogVisible"
        width="60%"
        append-to-body
      >
        <div style="width: 100%">
          <baidu-map :value="form.point" @change="changeAddr"></baidu-map>
          <div style="text-align: center;margin-top: 20px;">
            <el-button size="mini" type="primary" @click="addrDialogVisible = false">确定</el-button>
          </div>
        </div>
      </el-dialog>

      <div style="text-align: left">
        <el-button type="text" style="margin-left: 3px" @click="showBuilding = true">添加楼栋</el-button>
      </div>
      <div>
        <el-table
          :data="form.buildingList"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="buildingName"
            label="楼栋名称"
          >
          </el-table-column>
          <el-table-column
            prop="floorNum"
            label="楼层数"
          >
          </el-table-column>
          <el-table-column
            prop="floorCode"
            label="楼层"
          >
            <div slot-scope="scope">
              <span>{{ getFloorName(scope.row.floorList) }}</span>
            </div>
          </el-table-column>

          <el-table-column
            v-if="!isView"
            fixed="right"
            label="操作"
          >
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="editBuilding(scope.row,scope.$index)">编辑</el-button>
              <el-button type="text" size="small" @click="delBuilding(scope.$index,scope.row)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="!isView" style="text-align:right;padding-top: 20px;">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>

      <div v-if="showBuilding">
        <el-dialog
          :visible.sync="showBuilding"
          width="60%"
          append-to-body
        >
          <span>
            <el-form
              ref="buildingForm"
              style="width: 90%"
              :model="buildingForm"
              size="mini"
              :rules="buildingRules"
              label-width="120px"
            >
              <el-form-item label="楼栋名称:" prop="buildingName">
                <el-input v-model="buildingForm.buildingName" placeholder="楼栋名称"></el-input>
              </el-form-item>
              <el-form-item label="快速添加:">
                <el-switch v-model="value1"></el-switch>
              </el-form-item>
              <el-form-item v-show="value1" label="地上楼层">
                <el-input placeholder="楼层数"></el-input>
              </el-form-item>
              <el-form-item v-show="value1" label="地下楼层">
                <el-input placeholder="楼层数"></el-input>
              </el-form-item>
              <el-form-item label="楼层编号:">
                <el-tag
                  v-for="tag in buildingForm.floorList"
                  :key="tag.floorName"
                  closable
                  size="medium"
                  :disable-transitions="false"
                  @close="delFloor(tag)"
                >
                  {{ tag.floorName }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  @keyup.enter.native="addFloor"
                  @blur="addFloor"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="mini" @click="showInput">新增楼层</el-button>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showBuilding = false">取 消</el-button>
            <el-button type="primary" @click="addBuilding">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import BaiduMap from '@/components/BaiduMap'
  import {
    addPark,
    getPark,
    listBuilding,
    listFloor,
    delBuilding,
    addBuilding,
    delFloor,
    addFloor,
    editBuilding,
    editPark
  } from '@/api/yqgl/yqxx'

  export default {
    components: { BaiduMap },
    props: {
      type: String,
      id: String
    },
    data() {
      return {
        value1: false,

        showBuilding: false,
        parkName: '',
        buildingIndex: '',
        addrDialogVisible: false,
        loading: false,
        inputVisible: false,
        total: 1,
        inputValue: '',
        form: {
          point: '',
          parkName: '',
          parkProvince: '',
          parkCity: '',
          parkArea: '',
          addr: '',
          parkAddrress: '',
          parkLongitude: '',
          parkLatitude: '',
          contactName: '',
          contactTelephone: '',
          buildingList: []
        },
        buildingForm: {
          buildingName: '',
          floorNum: '',
          floorList: []
        },
        floorForm: {
          floorName: ''
        },
        buildingRules: {
          buildingName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ]
        },
        rules: {
          parkName: [
            { required: true, message: '请输名称', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请选择地址', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入园区联系人姓名', trigger: 'blur' }
          ],
          parkAddrress: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          contactTelephone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' }
          ],
          categoryId: [
            { required: true, message: '请选择类目', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type === 'edit'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.query()
      }
    },
    methods: {
      getFloorName(floors) {
        let name = ''
        if (floors) {
          for (let item of floors) {
            if (name) {
              name = name + ',' + item.floorName
            } else {
              name = name + item.floorName
            }
          }
        }
        return name
      },
      query() {
        let param = { id: this.id }
        getPark(param).then(res => {
          this.form = res.data
          this.form.addr = `${this.form.parkProvince}/${this.form.parkCity}/${this.form.parkArea}`
          this.form.point = { lng: this.form.parkLongitude, lat: this.form.parkLatitude }
          this.getBuilding()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getBuilding() {
        let param = { parkId: this.id }
        listBuilding(param).then(res => {
          this.$set(this.form, 'buildingList', res.data)
          this.getFloor()
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getFloor() {
        let param = { parkId: this.id }
        listFloor(param).then(res => {
          for (let item of this.form.buildingList) {
            for (let floorItem of res.data) {
              if (item.id === floorItem.buildingId) {
                if (item.floorList) {
                  item.floorList.push(floorItem)
                } else {
                  this.$set(item, 'floorList', [floorItem])
                }
              }
            }
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      delBuilding(index, item) {
        if (this.isEdit) {
          delBuilding({ id: item.id }).then(res => {
          }).catch(err => {
            this.$message.error(err)
          })
        }

        this.form.buildingList.splice(index, 1)
      },
      editBuilding(value, index) {
        this.buildingIndex = index
        this.buildingForm = value
        this.showBuilding = true
      },
      doAddBuilding() {
        this.buildingForm.floorNum = this.buildingForm.floorList.length
        this.buildingForm.parkId = this.form.id
        this.buildingForm.parkName = this.form.parkName
        if (this.buildingIndex !== '') {
          this.form.buildingList[this.buildingIndex] = this.buildingForm

          if (this.isEdit) {
            editBuilding({ id: this.buildingForm.id, buildingName: this.buildingForm.buildingName }).then(res => {
            }).catch(err => {
              this.$message.error(err)
            })
          }
        } else {
          this.form.buildingList.push(this.buildingForm)
          this.buildingForm.floors = JSON.stringify(this.buildingForm.floorList)

          if (this.isEdit) {
            addBuilding(this.buildingForm).then(res => {
            }).catch(err => {
              this.$message.error(err)
            })
          }
        }

        this.showBuilding = false
        this.buildingForm = {
          buildingName: '',
          floorNum: '',
          floorList: []
        }
        this.buildingIndex = ''
      },
      addBuilding() {
        this.$refs.buildingForm.validate((valid) => {
          if (valid) {
            this.doAddBuilding()
          } else {
            return false
          }
        })
      },
      changeAddr(addr, point) {
        this.form.parkProvince = addr.province
        this.form.parkCity = addr.city
        this.form.parkArea = addr.district
        this.form.parkAddrress = addr.street + addr.streetNumber
        this.form.addr = `${this.form.parkProvince}/${this.form.parkCity}/${this.form.parkArea}`
        this.form.parkLongitude = point.lng
        this.form.parkLatitude = point.lat
      },
      delFloor(tag) {
        if (this.isEdit) {
          delFloor({ id: tag.id }).then(res => {
          }).catch(err => {
            this.$message.error(err)
          })
        }
        this.buildingForm.floorList.splice(this.buildingForm.floorList.indexOf(tag), 1)
      },
      addFloor() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.buildingForm.floorList.push({ floorName: inputValue })

          if (this.buildingIndex !== '' && this.isEdit) {
            let param = {
              parkId: this.form.id,
              parkName: this.form.parkName,
              buildingId: this.buildingForm.id,
              buildingName: this.buildingForm.buildingName,
              floorName: inputValue
            }
            addFloor(param).then(res => {
            }).catch(err => {
              this.$message.error(err)
            })
          }
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              editPark(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            } else {
              this.form.buildings = JSON.stringify(this.form.buildingList)
              addPark(this.form).then(res => {
                this.$emit('save')
              }).catch(err => {
                this.$message.error(err)
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    height: 30px;
    width: 90px;
  }

</style>
