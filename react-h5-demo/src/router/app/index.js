import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Dashboard = Loadable({loader: () => import(/*webpackChunkName:'Dashboard'*/'@/views/dashboard'),loading: Loading});
const Login = Loadable({loader: () => import(/*webpackChunkName:'Login'*/'@/views/login'),loading: Loading});

export default [
  { path: "/dashboard", component: Dashboard },
  { path: "/login", component: Login },
];
