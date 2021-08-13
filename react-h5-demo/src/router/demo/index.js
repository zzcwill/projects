import Loadable from 'react-loadable';
import Loading from '@/components/Loading'
const Demo = Loadable({loader: () => import(/*webpackChunkName:'Demo'*/'@/views/demo'),loading: Loading});

const Chart = Loadable({loader: () => import(/*webpackChunkName:'Chart'*/'@/views/demo/chart'),loading: Loading});
const ComponentPage = Loadable({loader: () => import(/*webpackChunkName:'ComponentPage'*/'@/views/demo/componentPage'),loading: Loading});
const ComponentPage2 = Loadable({loader: () => import(/*webpackChunkName:'ComponentPage2'*/'@/views/demo/componentPage2'),loading: Loading});

const Store = Loadable({loader: () => import(/*webpackChunkName:'Store'*/'@/views/demo/store'),loading: Loading});

const Img = Loadable({loader: () => import(/*webpackChunkName:'Img'*/'@/views/demo/img'),loading: Loading});
const Css = Loadable({loader: () => import(/*webpackChunkName:'Css'*/'@/views/demo/css'),loading: Loading});

const Ref = Loadable({loader: () => import(/*webpackChunkName:'Ref'*/'@/views/demo/ref'),loading: Loading});

export default [
  { path: "/demo/index", component: Demo },
  { path: "/demo/chart", component: Chart },
  { path: "/demo/component", component: ComponentPage },
  { path: "/demo/component2", component: ComponentPage2 },
  { path: "/demo/store", component: Store },
  { path: "/demo/img", component: Img },
  { path: "/demo/css", component: Css },
  { path: "/demo/ref", component: Ref },
];
