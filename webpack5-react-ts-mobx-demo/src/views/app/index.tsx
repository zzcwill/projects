import React, { lazy, Suspense, useState } from 'react'
import { observer } from 'mobx-react-lite'
// import { useStore } from '@/hooks'
import { Demo1 } from '@/components'

// 使用import语法配合react的Lazy动态引入资源
// webpackPreload  浏览器页面必定需要的资源,浏览器一定会加载这些资源
// webpackPrefetch 浏览器不一定会加载这些资源,会在空闲时加载
const LazyDemo = lazy(() => import(
  /* webpackChunkName: "lazy-demo" */ // 资源打包后的文件chunkname
  /* webpackPrefetch: true */ // 开启prefetch预获取
  '@/components/lazy-demo'
))

import logo from '@/assets/images/logo.png'


import './index.css'
import './index.less'

const App = observer(() => {
  // const [{appStore}] = useStore()
  const [show, setShow] = useState(false)

  return (
    <div className="app">
      <div className="info">info</div>
      <div className='txt'>txt</div>
      <img src={logo} />
      <br />
      <Demo1 />
      <br />
      <div
        onClick={()=> {
          setShow(true)
        }}
      >
        get-lazy-demo
      </div>
      {
        show && <Suspense fallback={null}><LazyDemo /></Suspense>
      }
    </div>
  )
})

export default App
