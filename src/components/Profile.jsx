import React from 'react'
import { fetchGetOwner, fetchGetEmployee, getRoleBasedOnToken } from '../services/api';
import { useState, useEffect } from 'react';

export const Profile = () => {
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
    <article>
      <h1 className='text-4xl font-bold m-5'>{profileInfo && profileInfo.role === 'OWNER' ? 'Owner' : profileInfo && profileInfo.role === 'EMPLOYEE' ? 'Employee' : 'Perfil'}</h1>
      <section className='grid grid-cols-2'>
        <ul className='list-disc'>
        <li id="profileId" className='text-2xl'>ID: {profileInfo && profileInfo.id}</li>
          <li id="profileNames" className='text-2xl'>Name: {profileInfo && profileInfo.firstName + " " + profileInfo.lastName}</li>
          <li id='profileEmail' className='text-2xl'>Email: {profileInfo && profileInfo.email}</li>
          <li id='profilePhone' className='text-2xl'>Phone Number: {profileInfo && profileInfo.phoneNumber}</li>
        </ul>
      </section>
    </article>
  )
}