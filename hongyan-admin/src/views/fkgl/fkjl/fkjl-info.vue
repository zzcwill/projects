<template>
  <div class="fkyy-edit-page">
    <div class="p-10 bg-white brs-4 def-shadow">
      <br>
      <div class="flex-center w-fit-content">

        <el-form ref="form" :inline="true" :model="form" size="mini" label-width="160px">
          <div class="form-line">
            <el-form-item label="访问园区：">
              <div class="info-detail">{{form.parkName}}</div>
            </el-form-item>
            <el-form-item label="接待人员：">
              <div class="info-detail">{{form.beVisitorName}}</div>
            </el-form-item>
            <el-form-item label="接待人员手机号：">
              <div class="info-detail">{{form.beVisitorPhone}}</div>
            </el-form-item>
            <el-form-item label="审核时间：">
              <div class="info-detail">{{form.updateTime}}</div>
            </el-form-item>
            <el-form-item label="访客姓名：">
              <div class="info-detail">{{form.visitorName}}</div>
            </el-form-item>
            <el-form-item label="访客手机号：">
              <div class="info-detail">{{form.visitorPhone}}</div>
            </el-form-item>
            <el-form-item label="来访车牌号：">
              <div class="info-detail">浙A3DS3F、浙B3GD3F</div>
            </el-form-item>
            <el-form-item label="来访事由：">
              <div class="info-detail">{{form.visitorReason}}</div>
            </el-form-item>
            <el-form-item label="来访人数：">
              <div class="info-detail">{{form.visitorNumber}}
                <el-button size="mini" type="primary" @click="showInput(form.id)" style="margin-left: 20px">查看随行人员
                </el-button>
              </div>
            </el-form-item>
            <el-form-item label="访问开始时间：">
              <div class="info-detail">{{form.createTime}}</div>
            </el-form-item>
            <el-form-item label="访问结束时间：">
              <div class="info-detail">{{form.updateTime}}</div>
            </el-form-item>
          </div>
          <div class="form-line">
            <el-form-item label="临时卡编号：">
              <div>9633312233654523
                <el-button size="mini" type="primary" @click="showInfoDetail" style="margin-left: 20px">查看出入记录
                </el-button>
              </div>
            </el-form-item>
          </div>
          <div class="form-line">
            <el-form-item label="发卡时间：">
              <div class="info-detail">{{form.createTime}}</div>
            </el-form-item>
            <el-form-item label="还卡时间：">
              <div class="info-detail">{{form.updateTime}}</div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div v-if="showPeopleDialog" style="margin-top: 100px">
      <el-dialog
        title="随行人员"
        :visible.sync="showPeopleDialog"
        width="80%"
        style=" margin-top: 10vh !important;padding-left: 20px;padding-right: 20px;"
        append-to-body
      >
        <div>
          <fkjl-visitor-detail :view="viewData" :type="type"
                               :list="visitorList"></fkjl-visitor-detail>
        </div>
      </el-dialog>
    </div>
    <div v-if="addCardDialog" style="margin-top: 150px">
      <el-dialog
        title="出入记录"
        :visible.sync="addCardDialog"
        width="76%"
        style=" margin-top: 15vh !important;padding-left: 20px;padding-right: 20px;"
        append-to-body
      >
        <div>
          <fkyy-card-detail :view="viewData" :type="type" :list="cardList"></fkyy-card-detail>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { queryVisitorRetinueList, addVisitorAppointment, queryVisitorCarList } from '@/api/fkgl/fkgl'
  import fkjlCardDetail from './fkjl-card-detail'
  import fkjlVisitorDetail from './fkjl-visitor-detail'
  import search from '@/components/search'

  export default {
    components: { fkjlVisitorDetail, search, fkjlCardDetail },
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
        cardList: [{
          time: '2019-01-01 18:00:00',
          meType: 'AG332324',
          cardType: '饭卡',
          username: '陈晓健',
          location: '创业园北门'
        }],
        visitorList: [],
        carListDetail: [],
        carListDetailTag: [],
        visitorDetail: [],
        viewData: {},
        visitorDetailTag: [],
        inputValue: '',
        showPeopleDialog: false,
        addCardDialog: false,
        pickerOptionsStart: {
          disabledDate: (time) => {
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
          }
        }
      }
    },
    computed: {},
    created() {
      this.queryCar()
    },
    methods: {
      showInfoDetail() {
        this.addCardDialog = true
      },
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
        this.showPeopleDialog = true
      },
      showInput(id) {
        queryVisitorRetinueList({ visitorId: id }).then(res => {
          if (res.data != null && res.data !== undefined) {
            this.visitorList = res.data
          }
        }).catch(err => {
          this.$message.error(err)
        })
        this.showPeopleDialog = true
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
  .info-detail {
    width: 200px;
  }

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

