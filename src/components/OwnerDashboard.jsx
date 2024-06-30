import React from 'react'
import { fetchAssignEmployee, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const OwnerDashboard = () => {
    const [profileInfo, setProfileInfo] = useState({});
    const [employeeId, setEmployeeId] = useState('');
    const [ownerId, setOwnerId] = useState('');

    useEffect(() => {
        const fetchProfileInfo = async () => {
          try {
            const role = getRoleBasedOnToken();
            let profileData;
    
            if (role === 'ROLE_OWNER') {
              profileData = await fetchGetOwner();
              setOwnerId(profileData.id);
              console.log(profileData)
            } else if (role === 'ROLE_EMPLOYEE') {
              profileData = await fetchGetEmployee();
            }
            setProfileInfo(profileData);
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
    
      return (
        <div>
          <h1 className='text-4xl font-bold m-5'>Owner Dashboard</h1>
          <div>
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