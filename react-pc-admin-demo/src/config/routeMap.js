import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});

//我的任务
const WdrwWdrw = Loadable({loader: () => import(/*webpackChunkName:'WdrwWdrw'*/'@/views/wdrw/wdrw'),loading: Loading});
const WdrwQxgl = Loadable({loader: () => import(/*webpackChunkName:'WdrwQxgl'*/'@/views/wdrw/qxgl'),loading: Loading});
const WdrwFlow = Loadable({loader: () => import(/*webpackChunkName:'WdrwFlow'*/'@/views/wdrw/wdrw/flow'),loading: Loading});
const WdrwInfo = Loadable({loader: () => import(/*webpackChunkName:'WdrwInfo'*/'@/views/wdrw/wdrw/info'),loading: Loading});
const WdrwImgInfo = Loadable({loader: () => import(/*webpackChunkName:'WdrwImgInfo'*/'@/views/wdrw/wdrw/imgInfo'),loading: Loading});

//平台管理
const PtglYygl = Loadable({loader: () => import(/*webpackChunkName:'PtglYygl'*/'@/views/ptgl/yygl'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard },

  { path: "/wdrw/wdrw", component: WdrwWdrw },
  { path: "/wdrw/qxgl", component: WdrwQxgl },
  { path: "/wdrw/flow", component: WdrwFlow },
  { path: "/wdrw/info", component: WdrwInfo },
  { path: "/wdrw/imgInfo", component: WdrwImgInfo },

  { path: "/ptgl/yygl", component: PtglYygl },
    
  { path: "/error/404", component: Error404 }
];
