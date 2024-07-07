import { useState } from 'react'
import './App.css'
import { Navigate, BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { EditProfile } from './pages/EditProfile'
import Products from './pages/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path="/profile/edit" element={<EditProfile/>} />
          <Route path="/products" element={<Products/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
