import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Routes from '@/routes'
// import App from './views/app'

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

const initApp = () => {
  const root = document.getElementById('root')

  if(root) {
    createRoot(root).render(<App />)
  }
}

initApp()
