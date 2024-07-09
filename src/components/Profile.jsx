import React from 'react'
import { fetchGetOwner, fetchGetEmployee, getRoleBasedOnToken } from '../services/api';
import { useState, useEffect } from 'react';

export const Profile = () => {
    const [ownerId, setOwnerId] = useState('');
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
      const fetchProfileInfo = async () => {
        try {
          const role = getRoleBasedOnToken();
          let profileData;
  
          if (role === 'ROLE_OWNER') {
            profileData = await fetchGetOwner();
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
    return (
      <article className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className='text-4xl font-bold my-5'>{profileInfo && (profileInfo.role === 'OWNER' ? 'Owner' : (profileInfo.role === 'EMPLOYEE' ? 'Employee' : 'Perfil'))}</h1>
        <section className='bg-white p-6 rounded-lg shadow-md text-2xl'>
          <div className="text-lg mb-4">
            <p><strong>ID:</strong> {profileInfo && profileInfo.id}</p>
            <p><strong>Name:</strong> {profileInfo && profileInfo.firstName + " " + profileInfo.lastName}</p>
            <p><strong>Email:</strong> {profileInfo && profileInfo.email}</p>
            <p><strong>Phone Number:</strong> {profileInfo && profileInfo.phoneNumber}</p>
          </div>
        </section>
      </article>
  )  
}