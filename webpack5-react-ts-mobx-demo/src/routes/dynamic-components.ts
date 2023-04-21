import { suspended } from './suspended'

// 需要通过异步的方式引入的页面，需要在这里使用 suspended 包裹
export const App = suspended(() => import('@/views/app'))
