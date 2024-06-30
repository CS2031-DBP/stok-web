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
          console.log(profileData)
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
          <li id="profileNames" className='text-2xl'>{profileInfo && profileInfo.firstName + " " + profileInfo.lastName}</li>
          <li id='profileEmail' className='text-2xl'>{profileInfo && profileInfo.email}</li>
          <li id='profilePhone' className='text-2xl'>{profileInfo && profileInfo.phoneNumber}</li>
        </ul>
      </section>
    </article>
  )
}