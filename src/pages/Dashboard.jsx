import React from 'react';
import { Profile } from '../components/Profile';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';
import Stoklogo from "./stoklogo.png";
import profilelogo from "./profilelogo.png";
import './Home.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userRole = await getRoleBasedOnToken();
                setRole(userRole);
            } catch (error) {
                console.error('Error fetching user role', error);
            }
        };

        fetchUserRole();
    }, []);

    const handleEditProfile = (e) => {
        e.preventDefault();
        try {
            navigate('/profile/edit');
        } catch (err) {
            console.error('Error durante la navegación a la edición del perfil', err);
        }
    };
  return (
      <div>
          <header>
              <nav>
                  <img src={Stoklogo} alt="stoklogo" className="decoration-line"/>
                  <ul className="nav-links">
                      <li><a href="/login">Login</a></li>
                      <li><a href="/register">Register</a></li>
                  </ul>
              </nav>
          </header>
          <main className='grid grid-cols-2'>
              <div className="cuadros">
                  <Profile/>
                  <div className='flex justify-center'>
                      <button
                          id='editProfile'
                          className='bg-primary text-white font-bold py-2 px-20 mt-10 rounded-full cursor-pointer'
                          onClick={handleEditProfile}
                      >
                          Editar
                      </button>
                  </div>
              </div>

              <div className="cuadros">
                  {role === 'ROLE_OWNER' ? <OwnerDashboard/> : <EmployeeDashboard/>}
              </div>
          </main>
      </div>
  )
}

export default Dashboard;
