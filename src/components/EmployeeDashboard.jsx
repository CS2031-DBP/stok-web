import React from 'react'
import { fetchAssignEmployee, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const role = getRoleBasedOnToken();
        let profileData;
        profileData = await fetchGetEmployee();
        console.log(profileData)
        setOwner(profileData.owner);
      } catch (error) {
        console.error('Error fetching profile information', error);
      }
  };

    fetchProfileInfo();
  }, []);

    const handleProducts = (e) => {
      e.preventDefault();
      try {
        if(owner == null){
          alert('Employee no asignado')
        }
        else{
          navigate('/products')
        }
      } catch (err) {
        console.error('Error durante la navegación a la edición del perfil', err);
      }
  };
  
    return (
      <div>
        <h1 className='text-4xl font-bold m-5'>Employee Dashboard</h1>
        <div className=' mb-5'>
          <button 
              onClick={handleProducts}
              className='ml-2 p-3 px-10 bg-primary text-white rounded'
          >
              Products
          </button>
        </div>

        <div className=' mb-5'>
          <button 
              onClick={handleProducts}
              className='ml-2 p-3 px-10 bg-primary text-white rounded'
          >
              Suppliers
          </button>
        </div>

        <div className=' mb-5'>
          <button 
              onClick={handleProducts}
              className='ml-2 p-3 px-10 bg-primary text-white rounded'
          >
              Sales
          </button>
        </div>  
      </div>
    );
}