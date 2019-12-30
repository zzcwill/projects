<template>
  <div class="fkyy-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">

        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="160px" :rules="rules"
                 :disabled="isView">
          <div class="form-line">
            <el-form-item label="访问园区：" prop="parkId">
              <search type="park" show-name="parkName" :value="form.parkId" @change="changePark"></search>
            </el-form-item>
            <el-form-item label="接待人员：" prop="beVisitorId">
              <search type="employee" show-name="nickName" :value="form.beVisitorId" @change="changeEmployee"></search>
            </el-form-item>
            <el-form-item label="联系人姓名：" prop="visitorName">
              <el-input v-model="form.visitorName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话：" prop="visitorPhone">
              <el-input v-model.number="form.visitorPhone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系人身份证：" prop="visitorIdCard">
              <el-input v-model="form.visitorIdCard" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="公司名称：" prop="visitorCompanyName">
              <el-input v-model="form.visitorCompanyName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属部门：" prop="visitorCompany">
              <el-input v-model="form.visitorCompany" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="预约来访时间：" prop="visitorTime">
              <el-date-picker
                v-model="form.visitorTime"
                type="datetime"
                placeholder="请选择来访时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptionsStart"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="来访事由：" prop="visitorReason">
              <el-input v-model="form.visitorReason" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来访人数：" prop="visitorNumber">
              <el-input v-model.number="form.visitorNumber" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </div>
          <!--随行车辆-->
          <div id="car-retinue">
            <div v-if="isView" class="visitor-detail-div">
              <el-form-item label="随行车辆：" style="margin-right: 0px"/>
              <el-form-item v-if="this.carListDetail.length===0">无随行车辆</el-form-item>
              <el-tag
                v-else
                v-for="tag in this.carListDetail"
                style="margin-right: 5px"
                :disable-transitions="false"
                @click="showCarDetail(tag)"
              >
                {{ tag.carNumber }}
              </el-tag>
            </div>
            <div v-else class="visitor-detail-div">
              <el-form-item label="车辆登记：" style="margin-right: 0px"/>
              <el-tag
                v-for="tag in carListDetailTag"
                :key="tag"
                style="margin-right: 5px"
                closable
                :disable-transitions="false"
                @close="carHandleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-button size="mini" type="primary" @click="showInputCar">添加车辆</el-button>
            </div>
          </div>

          <!--随行人员-->
          <div id="visitor-retinue">
            <div v-if="isView" class="visitor-detail-div">
              <el-form-item label="随行人员：" style="margin-right: 0px"/>
              <el-form-item v-if="this.visitorDetail.length===0">无随行人员</el-form-item>
              <el-tag
                v-else
                v-for="tag in this.visitorDetail"
                style="margin-right: 5px"
                :disable-transitions="false"
                @click="showVisitorDetail(tag)"
              >
                {{ tag.visitorName }}
              </el-tag>
            </div>
            <div v-else class="visitor-detail-div">
              <el-form-item label="添加随行人员：" style="margin-right: 0px"/>
              <el-tag
                v-for="tag in visitorDetailTag"
                :key="tag"
                style="margin-right: 5px"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-button size="mini" type="primary" @click="showInput">添加人员</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div style="text-align:right;">
        <el-button type="primary" @click="submit" v-if="isEdit">提交</el-button>
      </div>
    </div>
    <div v-if="addCarDialog" style="margin-top: 100px">
      <el-dialog
        title="随行车辆"
        :visible.sync="addCarDialog"
        width="80%"
        style=" margin-top: 10vh !important;padding-left: 20px;padding-right: 20px;"
        append-to-body
      >
        <div>
          <fkyy-car-detail @save="addCar" :view="viewData" :type="type"></fkyy-car-detail>
        </div>
      </el-dialog>
    </div>
    <div v-if="showDialog" style="margin-top: 100px">
      <el-dialog
        title="随行人员"
        :visible.sync="showDialog"
        width="80%"
        style=" margin-top: 10vh !important;padding-left: 20px;padding-right: 20px;"
        append-to-body
      >
        <div>
          <fkyy-visitor-detail @save="addVisitor" :view="viewData" :type="type"></fkyy-visitor-detail>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { queryVisitorRetinueList, addVisitorAppointment, queryVisitorCarList } from '@/api/fkgl/fkgl'
  import fkyyCarDetail from './fkyy-car-detail'
  import fkyyVisitorDetail from './fkyy-visitor-detail'
  import search from '@/components/search'

  export default {
    components: { fkyyVisitorDetail, search, fkyyCarDetail },
    props: {
      item: Object,
      type: String
    },
    data() {
      return {
        form: {
          beVisitorId: '',
          parkId: '',
          visitorName: '',
          visitorPhone: '',
          visitorIdCard: '',
          visitorCompanyName: '',
          visitorCompany: '',
          visitorNumber: 1,
          carNumber: '',
          visitorTime: '',
          visitorReason: '',
          visitorList: '',
          carList: ''
        },
        carListDetail: [],
        carListDetailTag: [],
        visitorDetail: [],
        viewData: {},
        visitorDetailTag: [],
        inputValue: '',
        showDialog: false,
        addCarDialog: false,
        pickerOptionsStart: {
          disabledDate: (time) => {
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          }
        },
        rules: { // 必填字段校验
          parkId: [
            { required: true, message: '请输入访问园区', trigger: 'change' }
          ],
          beVisitorId: [
            { required: true, message: '请输入接待人名', trigger: 'change' }
          ],
          visitorName: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          visitorPhone: [
            { required: true, message: '请输入联系人手机号码', trigger: 'blur' },
            { type: 'number', message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          visitorTime: [
            { required: true, message: '请选择来访日期', trigger: 'blur' }
          ],
          visitorIdCard: [
            { required: true, message: '请输入联系人身份证号码', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的身份证号码'))
                }
              }, trigger: 'blur'
            }
          ],
          visitorReason: [
            { required: true, message: '请输入来访事由', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      isView() {
        return this.type === 'view'
      },
      isEdit() {
        return this.type !== 'view'
      }
    },
    created() {
      if (this.type !== 'add') {
        this.queryVisitor()
        this.queryCar()
      }
    },
    methods: {
      changeEmployee(item) {
        this.form.beVisitorId = item.id
        this.form.beVisitorName = item.nickName
        this.form.beVisitorPhone = item.userPhone
        this.form.beVisitorCompanyId = item.partnerId
        this.form.beVisitorCompanyName = item.partnerName
        this.form.beVisitorCompany = item.orgId
      },
      changePark(val) {
        this.form.parkId = val.id
        this.form.parkName = val.parkName
      },
      showVisitorDetail(val) {
        this.viewData = val
        this.showDialog = true
      },
      showCarDetail(val) {
        this.viewData = val
        this.addCarDialog = true
      },
      addCar(val) {
        this.carListDetailTag.push(val.carNumber)
        this.carListDetail.push(val)
        this.addCarDialog = false
      },
      addVisitor(val) {
        this.visitorDetailTag.push(val.visitorName)
        this.visitorDetail.push(val)
        this.form.visitorNumber = this.form.visitorNumber + 1
        this.showDialog = false
      },
      showInput() {
        this.showDialog = true
      },
      showInputCar() {
        this.addCarDialog = true
      },
      handleClose(tag) {
        this.visitorDetailTag.splice(this.visitorDetailTag.indexOf(tag), 1)
        for (let i = 0; i < this.visitorDetail.length; i++) {
          if (this.visitorDetail[i].visitorName === tag) {
            this.visitorDetail.splice(i, 1)
            break
          }
        }
        this.form.visitorNumber = this.form.visitorNumber - 1
      },
      carHandleClose(tag) {
        this.carListDetailTag.splice(this.carListDetailTag.indexOf(tag), 1)
        for (let i = 0; i < this.carListDetail.length; i++) {
          if (this.carListDetail[i].carNumber === tag) {
            this.carListDetail.splice(i, 1)
          }
        }
      },
      queryCar() {
        this.form = this.item
        let params = { visitorId: this.item.id }
        queryVisitorCarList(params).then(res => {
          if (res.data != null && res.data !== undefined) {
            this.carListDetail = res.data
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      queryVisitor() {
        this.form = this.item
        let params = { visitorId: this.item.id }
        queryVisitorRetinueList(params).then(res => {
          if (res.data != null && res.data !== undefined) {
            this.visitorDetail = res.data
          }
        }).catch(err => {
          this.$message.error(err)
        })
      },
      submit() {
        let that = this
        // 数据完整性校验
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              cancelButtonClass: 'btn-custom-cancel',
              type: 'warning'
            }).then(() => {
              // 将visitorDetail转换为Json字符串
              that.form.visitorList = JSON.stringify(this.visitorDetail)
              // 将carListDetail转换为Json字符串
              that.form.carList = JSON.stringify(this.carListDetail)
              addVisitorAppointment(that.form).then(res => {
                if (res.code === 0) {
                  this.$emit('save', 1)
                } else {
                  this.$message.error(res.msg)
                }
              }).catch(err => {
                this.$message.error(err)
              })
            }).catch((err) => {
              this.$message.error(err)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }

  .el-select {
    width: 200px;
  }

  .el-autocomplete {
    width: 200px;
  }

  .el-cascader {
    width: 200px;
  }

</style>

