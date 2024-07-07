import React from 'react'
import { fetchAssignEmployee, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const OwnerDashboard = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
          try {
            const role = getRoleBasedOnToken();
            let profileData;
            profileData = await fetchGetOwner();
            setOwnerId(profileData.id);
          } catch (error) {
            console.error('Error fetching profile information', error);
          }
        };
    
        fetchProfileInfo();
      }, []);

      const handleAssignEmployee = async () => {
        try {
          if (employeeId && ownerId) {
            await fetchAssignEmployee(ownerId, employeeId);
            alert('Employee assigned successfully!');
          } else {
            alert('Please enter a valid employee ID.');
          }
        } catch (error) {
          console.error('Error assigning employee:', error);
          alert('Failed to assign employee.');
        }
      };

      const handleProducts = (e) => {
        e.preventDefault();
        try {
          navigate('/products');
        } catch (err) {
          console.error('Error durante la navegación Product', err);
        } 
      };

      const handleSales = (e) => {
        e.preventDefault();
        try {
          navigate('/sales');
        } catch (err) {
          console.error('Error durante la navegación a Sales', err);
        }

      };
    
      return (
        <div>
          <h1 className='text-4xl font-bold m-5'>Owner Dashboard</h1>
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
                onClick={handleSales}
                className='ml-2 p-3 px-10 bg-primary text-white rounded'
            >
                Sales
            </button>
          </div>
          <h2 className='text-xl font-bold m-5'>Add Employee</h2>
          <div className=' mb-5'>
                <input
                    type="text"
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className='border border-gray-300 p-2 rounded'
                />
                <button 
                    onClick={handleAssignEmployee}
                    className='ml-2 p-2 bg-primary text-white rounded-full'
                >
                    Assign Employee
                </button>
            </div>
    
        </div>
      );
}