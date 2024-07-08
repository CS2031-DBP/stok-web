import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { EditProfile } from './pages/EditProfile'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Home from  './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Home"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/home' element={<Home></Home>}/>
          <Route path="/profile/edit" element={<EditProfile/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/sales" element={<Sales/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

