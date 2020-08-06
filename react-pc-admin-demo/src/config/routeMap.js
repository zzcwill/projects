import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});

//我的任务
const WdrwWdrw = Loadable({loader: () => import(/*webpackChunkName:'WdrwWdrw'*/'@/views/wdrw/wdrw'),loading: Loading});
const WdrwQxgl = Loadable({loader: () => import(/*webpackChunkName:'WdrwQxgl'*/'@/views/wdrw/qxgl'),loading: Loading});

//平台管理
const PtglYygl = Loadable({loader: () => import(/*webpackChunkName:'PtglYygl'*/'@/views/ptgl/yygl'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard },
  { path: "/wdrw/wdrw", component: WdrwWdrw },
  { path: "/wdrw/qxgl", component: WdrwQxgl },
  { path: "/ptgl/yygl", component: PtglYygl },
    
  { path: "/error/404", component: Error404 }
];
