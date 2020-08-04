import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Error404 = Loadable({loader: () => import(/*webpackChunkName:'Error404'*/'@/views/error/404'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard, roles: ["admin"] },
  { path: "/error/404", component: Error404, roles: ["admin"] },
];
