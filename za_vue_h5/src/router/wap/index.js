/* 打开 H5 页面 */
const H5 = () => import("@/pages/common/H5");
const UserLogin = () => import("@/pages/common/UserLogin");
const HomePage = () => import("@/pages/index");
const ContractSigningList = () => import("@/pages/contractsigning/ContractSigningList");
const SimpleCalculator = () => import("@/pages/simpleCalculator/SimpleCalculator");
const notFound = () => import("@/pages/common/404.vue");

// 规则中心
const ruleCenter = () => import("@/pages/ruleCenter/index.vue");
const waitBind = () => import("@/pages/ruleCenter/waitBind.vue");

/* 路由配置*/
export default [
  {
    path: "/",
    component: UserLogin,
    name: "userLogin",
    meta: {
      keepAlive: true // true 表示需要使用缓存
    }
  },
  {
    path: "/home",
    component: HomePage,
    name: "homePage"
  },
  {
    path: "/html5Page",
    component: H5,
    name: "h5Page"
  },
  {
    path: "/ruleCenter",
    component: ruleCenter,
    name: "ruleCenter"
  },
  {
    path: "/waitBind",
    component: waitBind,
    name: "waitBind"
  },
  {
    path: "/contractSigningList",
    component: ContractSigningList,
    name: "contractSigningList"
  },
  //简易计算器页
  {
    path: "/simpleCalculator",
    component: SimpleCalculator,
    name: "simpleCalculator"
  },
  
  {
    path: '/404',
    component: notFound,
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }    
];
