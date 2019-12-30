const state = {
  // 单元状态说明
  floorStateList: [
    { value: '0', label: '空置中' },
    { value: '1', label: '使用中' },
    { value: '3', label: '装修中' },
  ],
  // 房间户型
  apartmentType: [
    { value: '1', label: '平层户型' },
    { value: '2', label: '跃层户型' },
    { value: '3', label: '错层户型' },
    { value: '4', label: '复式户型' },
  ],
  // 入驻状态
  enterState: [
    { value: '1', label: '正常入驻' },
    { value: '2', label: '已经搬迁' },
  ],
  // 公告类别编码
  typeCode: [
    { value: '1', label: '公告' },
    { value: '2', label: '新闻' },
    { value: '3', label: '动态' },
  ],
  // 发布状态枚举
  publishCode: [
    { value: '1', label: '待发布' },
    { value: '2', label: '已发布' },
    { value: '3', label: '下线' },
  ],
  // 内容分类枚举
  contentType: [
    { value: '1', label: '园区新闻' },
    { value: '2', label: '普通新闻' },
  ],
  // 是否展示到官网合作
  isWebHome: [
    { value: '1', label: '是' },
    { value: '2', label: '否' },
  ],
  // 是否生效
  isEffect: [
    { value: '1', label: '生效' },
    { value: '2', label: '失效' },
  ],
  // 周的枚举
  weeks: [
    { value: '1', label: '周一' },
    { value: '2', label: '周二' },
    { value: '3', label: '周三' },
    { value: '4', label: '周四' },
    { value: '5', label: '周五' },
    { value: '6', label: '周六' },
    { value: '7', label: '周日' },
  ],
  // 时间单位
  timeUnit: [
    { value: '1', label: '分钟' },
    { value: '2', label: '小时' },
    { value: '3', label: '日' },
    { value: '4', label: '周' },
    { value: '5', label: '月' },
    { value: '6', label: '年' },
  ],
  // 巡检人员类型
  patrolCycleType: [
    { value: '1', label: '安保' },
    { value: '2', label: '维修' },
    { value: '3', label: '管理' },
    { value: '9', label: '其他' },
  ],
  // 日程任务优先级
  schedulePriorityType: [
    { value: '1', label: '一般' },
    { value: '2', label: '高' },
    { value: '3', label: '非常高' }
  ],
  // 日程任务优先级
  auditState: [
    { value: '1', label: '待审核' },
    { value: '2', label: '通过' },
    { value: '3', label: '不通过' },
    { value: '9', label: '未申请' },
  ],
  // 性别
  sex: [
    { value: '1', label: '男' },
    { value: '2', label: '女' },
    { value: '3', label: '不明' },
  ],
  // 巡更事件状态
  incidentStatus: [
    { value: '1', label: '现场解决' },
    { value: '2', label: '上报维修' },
    { value: '3', label: '后续观察' },
  ],
  // 收费方式枚举
  feeType: [
    { value: '1', label: '按面积' },
    { value: '2', label: '按使用量' },
    { value: '3', label: '按次' },
  ],
  // 表示 1是 2否 
  is: [
    { value: '1', label: '是' },
    { value: '2', label: '否' },
  ],
  // 维修状态
  repairType: [
    { value: '1', label: '未修复' },
    { value: '2', label: '已经修复' },
    { value: '3', label: '更换设备' },
  ],
  // 投诉建议处理状态
  tsjyStaus: [
    { value: '1', label: '处理中' },
    { value: '2', label: '已处理' },
    { value: '3', label: '待处理' },
  ]
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
