import React from 'react'
import { Demo1 } from '@/components'
import logo from '@/images/logo.png'

import './index.css'
import './index.less'

function App() {
  return (
    <div className='app'>
      <div className='info'>info1</div>
      <div className='txt'>txt</div>
      <img src={logo} />
      <br />
      <Demo1 />
    </div>
  )
}
export default App