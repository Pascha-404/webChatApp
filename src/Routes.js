import React from 'react'
import { Routes, Route } from 'react-router'
import LoginPage from './components/LoginPage/LoginPage'
import WebChatApp from './components/WebChatApp'

function Routing() {
  return (
      <Routes>
          <Route path="/" element={ <WebChatApp /> } />
          <Route path="login" element={ <LoginPage /> } />
    </Routes>
  )
}

export default Routing;