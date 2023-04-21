import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Routes from '@/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

const initApp = async () => {
  const root = document.getElementById('root')

  if(root) {
    createRoot(root).render(<App />)
  }
}

initApp()
