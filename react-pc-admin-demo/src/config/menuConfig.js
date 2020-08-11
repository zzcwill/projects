/**
 * icon:菜单项图标
 */
const menuList = [
  {
    title: "首页",
    path: "/dashboard",
    icon: "home",
  }, 
  {
    title: "我的任务",
    path: "/wdrw",
    icon: "cluster",
    children: [
      {
        title: "我的任务",
        path: "/wdrw/wdrw",
      },
      {
        title: "权限管理",
        path: "/wdrw/qxgl",
      },      
    ]
  },
  {
    title: "平台管理-demo",
    path: "/ptgl",
    icon: "copy",
    children: [
      {
        title: "我的任务",
        path: "/ptgl/yygl",
      }      
    ]
  }  
];
export default menuList;
