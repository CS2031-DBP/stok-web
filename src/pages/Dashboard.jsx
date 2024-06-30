import React from 'react'
import { Profile } from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleEditProfile = (e) => {
        e.preventDefault();
        try {
          navigate('/profile/edit');
        } catch (err) {
          console.error('Error durante la navegación a la edición del perfil', err);
        }
      };

  return (
    <main>
        <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <Profile />
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
    </main>
  )
}

export default Dashboard