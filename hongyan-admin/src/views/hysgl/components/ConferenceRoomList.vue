<template>
  <div>
    <div>
      <div class="form-box">
        <label>过滤：</label>
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          @change="init"
        >
        </el-date-picker>

        <el-time-select
          v-model="form.startTime"
          style="width: 120px;"
          placeholder="起始时间"
          :picker-options="{
            start: '07:00',
            step: '00:' + step,
            end: '23:00'}"
          @change="initTitle"
        >
        </el-time-select>
        <el-time-select
          v-model="form.endTime"
          style="width: 120px;"
          placeholder="结束时间"
          :picker-options="{
            start: '07:00',
            step: '00:' + step,
            end: '23:00',
            minTime: form.startTime}"
          @change="initTitle"
        >
        </el-time-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox v-model="form.isTv" true-label="1" false-label="2">电视</el-checkbox>
        <el-checkbox v-model="form.isWhiteboard" true-label="1" false-label="2">白板</el-checkbox>
        <el-checkbox v-model="form.isProjection" true-label="1" false-label="2">投影</el-checkbox>
        <el-checkbox v-model="form.isVideo" true-label="1" false-label="2">视频会议系统</el-checkbox>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" size="mini" @click="init">搜索</el-button>
        <el-button type="primary" size="mini" @click="ydClick">预订</el-button>
      </div>
    </div>

    <div>
      <table class="table">
        <tr>
          <th class="table-title" style="width: 10%">
            <div class="table-title-main">会议室</div>
          </th>
          <th
            v-for="(item, index) in listTitle"
            :key="index"
            :colspan="60/step"
            :style="'width:'+ 90/listTitle.length + '%'"
          >
            <div>
              {{ item }}
            </div>
          </th>
        </tr>
        <tr
          v-for="(conference, cindex) in list"
          :key="cindex"
          :class="isActive(conference.id)"
          @click="clickConference(conference.id)"
        >
          <td>
            <div class="table-title-main">
              <el-tooltip class="item" effect="light" placement="bottom-start">
                <div slot="content" style="width: 150px;">
                  <span>会议室面积：{{ conference.area }}平方</span><br />
                  <span>可容纳人数：{{ conference.containNum }}人</span><br />
                  <span>是否需要审批：{{ conference.autoCheck|checkFilter }}</span><br />
                  <span>电视：{{ conference.isTv|deviceFilter }}</span><br />
                  <span>白板：{{ conference.isWhiteboard|deviceFilter }}</span><br />
                  <span>投影：{{ conference.isProjection|deviceFilter }}</span><br />
                  <span>视频会议系统：{{ conference.isVideo|deviceFilter }}</span><br />
                  <span>空调系统：{{ conference.isAir|deviceFilter }}</span><br />
                  <span>照明系统：{{ conference.isLighting|deviceFilter }}</span><br />
                  <span>新风系统：{{ conference.isWind|deviceFilter }}</span><br />
                  <span>供水系统：{{ conference.isWater|deviceFilter }}</span><br />
                </div>
                <span> {{ conference.conferenceName }}</span>
              </el-tooltip>
            </div>
          </td>
          <td
            v-for="(item, index) in allTitle"
            :key="index"
            @mousedown="startApply(conference.id, item)"
            @mouseup="endApply(item,index)"
            @mousemove="moveApply(item,index)"
          >
            <block :id="conference.id" :item="item" :apply-data="applyData[conference.id]" :apply="apply"></block>
          </td>
        </tr>
      </table>
    </div>

    <br><br>
  </div>
</template>

<script>
  import { getConferenceList, listConferenceApply } from '@/api/hysgl/hysgl'
  import block from './block'

  export default {
    components: { block },
    filters: {
      checkFilter(val) {
        return val === '1' ? '需要' : '不需要'
      },
      deviceFilter(val) {
        return val === '1' ? '有' : '没有'
      }
    },
    data() {
      return {
        active: '',
        step: 30,
        listTitle: [],
        allTitle: [],
        applyFlag: false,
        apply: {
          conferenceId: '',
          startTime: '',
          tendTime: '',
          endTime: ''
        },
        form: {
          date: '',
          isPhone: '',
          isTv: '',
          isWhiteboard: '',
          isProjection: '',
          isVideo: '',
          startTime: '07:00',
          endTime: '23:00',
          pageCurrent: 1,
          pageLimit: 10000
        },
        list: [],
        applyData: {},
        applyAllData: {},
        applyList: []
      }
    },
    created() {
      let day = new Date()
      day.setTime(day.getTime())
      this.form.date = day.getFullYear() + '-' + (this.prefixZero((day.getMonth() + 1), 2)) + '-' + this.prefixZero(day.getDate(), 2)

      this.init()
    },
    methods: {
      ydClick() {
        this.$emit('ydClick', this.apply)
      },
      checkApply(t) {
        let time = Number(t.replace(':', ''))
        let applys = this.applyData[this.apply.conferenceId]
        if (applys) {
          for (let i = 0; i < applys.length; i++) {
            let item = applys[i]
            let start = Number(item.startTime.replace(':', ''))
            let end = Number(item.endTime.replace(':', ''))
            if (time >= start && time <= end) {
              return false
            }
          }
        }
        return true
      },
      moveApply(endTime, index) {
        if (!this.applyFlag) {
          return
        }
        if (!this.checkApply(this.allTitle[index + 1])) {
          return
        }
        this.apply.tendTime = endTime + ''
        endTime = this.allTitle[index + 1]
        this.apply.endTime = endTime
        console.log(this.apply)
      },
      startApply(id, startTime) {
        if (!this.checkApply(startTime)) {
          return
        }
        this.applyFlag = true
        this.apply = {
          conferenceId: id,
          startTime: startTime,
          tendTime: '',
          endTime: ''
        }
      },
      endApply(endTime, index) {
        if (!this.applyFlag) {
          return
        }
        if (!this.checkApply(this.allTitle[index + 1])) {
          return
        }
        this.apply.tendTime = endTime + ''
        endTime = this.allTitle[index + 1]
        this.apply.endTime = endTime
        this.applyFlag = false
        console.log(this.apply)
      },
      init() {
        this.listConference()
        this.listApply()
        this.initTitle()
        this.$emit('search', this.form)
      },
      reload() {
        listConferenceApply({ startDay: this.form.date }).then(res => {
          this.applyAllData = (res.data || {})
          if (res.data) {
            for (let key of Object.keys(res.data)) {
              console.log(key)
              let applyAllList = res.data[key]
              let applyList = []
              if (applyAllList) {
                for (let item of applyAllList) {
                  console.log(item)
                  if (item.apply.statusCode === '2') {
                    applyList.push(item)
                  }
                }
              }
              this.applyData[key] = applyList
            }
          }
          this.clickConference(this.active)
        })
      },
      listApply() {
        listConferenceApply({ startDay: this.form.date }).then(res => {
          this.applyAllData = (res.data || {})
          if (res.data) {
            for (let key of Object.keys(res.data)) {
              let applyAllList = res.data[key]
              let applyList = []
              if (applyAllList) {
                for (let item of applyAllList) {
                  console.log(item)
                  if (item.apply.statusCode === '2') {
                    applyList.push(item)
                  }
                }
              }
              this.applyData[key] = applyList
            }
          }
        })
      },
      listConference() {
        getConferenceList(this.form).then(res => {
          this.list = res.data
        })
      },
      clickConference(id) {
        this.active = id
        // this.applyList = []
        // if (this.applyAllData && this.applyAllData[id]) {
        //   this.applyAllData[id].forEach(item => {
        //     this.applyList.push(item.apply)
        //   })
        // }
        // this.$emit('changeList', this.applyList)
      },
      isActive(id) {
        return this.active === id ? 'active-tr' : ''
      },
      initTitle() {
        let start = this.form.startTime.split(':')
        let end = this.form.endTime.split(':')

        this.allTitle = []
        this.listTitle = []

        let hnum = Number(end[0]) - Number(start[0])
        for (let i = 0; i <= hnum; i++) {
          let hTitle = this.prefixZero(Number(start[0]) + i, 2)

          let mstart = 0
          let mend = 60

          this.listTitle.push(`${hTitle}:00`)

          for (let j = mstart; j <= mend; j = j + this.step) {
            let mTitle = this.prefixZero(j, 2)
            if (mTitle === '60') {
              continue
            }
            this.allTitle.push(`${hTitle}:${mTitle}`)
          }
        }
      },
      //补0
      prefixZero(num, n) {
        num = num + ''
        return (Array(n).join(0) + num).slice(-n)
      }
    }
  }
</script>

<style scoped>
  .active-tr {
    background-color: #fef5cc;
  }

  .table-title-main {
    margin-left: 15px;
  }

  .form-box {
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .table-title {
    line-height: 23px;
  }

  .table {
    width: 100%;
    color: #909399;
    border-collapse: collapse;
    border: 1px solid #ebeef5;
  }

  .table:hover {
    cursor: pointer;
  }

  th {
    border: 1px solid #ebeef5;
    height: 30px;
    text-align: left;
  }

  td {
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 0px;
  }
</style>
