import './App.css'
import { Navigate, BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { EditProfile } from './pages/EditProfile'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Suppliers from './pages/Suppliers'
import InventoryDetails from './pages/InventoryDetails'
import CodeBar128 from './pages/CodeBar128'


const App = () => {

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
          <Route path="/sales" element={<Sales/>} />
          <Route path="/suppliers" element={<Suppliers/>} />
          <Route path="/inventoryDetails" element={<InventoryDetails/>} />
          <Route path="/codebar" element={<CodeBar128/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

