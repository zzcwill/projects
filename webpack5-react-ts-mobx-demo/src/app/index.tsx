import React from 'react'
import logo from '@/images/logo.png'

import './index.css'
import './index.less'

function App() {
  return (
    <div className='app'>
      <div className='info'>info</div>
      <div className='txt'>txt</div>
      <img src={logo} />
    </div>
  )
}
export default App