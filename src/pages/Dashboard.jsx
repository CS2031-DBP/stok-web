import React from 'react';
import { Profile } from '../components/Profile';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';

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
          <main className='grid grid-cols-2'>
              <div className="cuadros">
                  <Profile/>
                  <div className='flex justify-center'>
                      <button
                          id='editProfile'
                          className='bg-primary text-white font-bold py-2 px-20 mt-5 rounded-full cursor-pointer'
                          onClick={handleEditProfile}
                      >
                          Editar
                      </button>
                  </div>
                  <div className='flex justify-center'>
                      <button
                          id='editProfile'
                          className='bg-primary text-white font-bold py-2 px-20 mt-5 rounded-full cursor-pointer'
                          onClick={() => navigate('/login')}
                      >
                          Log Out
                      </button>
                  </div>
                  <div className='flex justify-center'>
                      <button
                          id='editProfile'
                          className='bg-primary text-black font-bold py-2 px-20 mt-5 rounded-full cursor-pointer'
                          onClick={() => navigate('/codebar')}
                      >
                          BarCode128
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
