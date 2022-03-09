import React from 'react'
import { AuthProvider } from './contexts/auth.context'
import { Routes, Route } from 'react-router'
import LoginPage from './components/LoginPage/LoginPage'
import WebChatApp from './components/WebChatApp'

function Routing() {
  return (
      <AuthProvider>
        <Routes>
            <Route path="/" element={ <WebChatApp /> } />
            <Route path="login" element={ <LoginPage /> } />
            </Routes>
      </AuthProvider>
  )
}

export default Routing;