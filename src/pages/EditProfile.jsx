import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../components/Profile';
import { fetchUpdateOwner, fetchUpdateEmployee } from '../services/api';
import { getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchDeleteOwner, fetchDeleteEmployee } from '../services/api';

export const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [userRole, setUserRole] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [assignedOwnerIdToEmployee, setAssignedOwnerIdToEmployee] = useState(''); 

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const role = getRoleBasedOnToken();
        setUserRole(role);
        let profileData;

        if (role === 'ROLE_OWNER') {
          profileData = await fetchGetOwner();
          setOwnerId(profileData.id);
        } else if (role === 'ROLE_EMPLOYEE') {
          profileData = await fetchGetEmployee();
          setEmployeeId(profileData.id);
          console.log(profileData)
        }

        setFormData({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phoneNumber: profileData.phoneNumber,
        });
      } catch (error) {
        console.error('Error fetching profile information', error);
      }
    };

    fetchProfileInfo();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      if (userRole === 'ROLE_OWNER') {
        await fetchDeleteOwner(ownerId);
      } else if (userRole === 'ROLE_EMPLOYEE') {
        //setAssignedOwnerIdToEmployee(profileData.)
        await fetchDeleteEmployee(employeeId);
      }
      navigate('/login');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userRole === 'ROLE_OWNER') {
        await fetchUpdateOwner(ownerId, formData);
        navigate('/dashboard');
      } else if (userRole === 'ROLE_EMPLOYEE') {
        await fetchUpdateEmployee(employeeId, formData);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <main className='grid grid-cols-2'>
      <article className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
        <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Editar Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div className="sm:col-span-4 my-5">
            <label htmlFor="firstName" className="block text-lg font-medium leading-6 text-gray-900">
              Nombres
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4 my-5">
            <label htmlFor="lastName" className="block text-lg font-medium leading-6 text-gray-900">
              Apellidos
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4 my-5">
            <label htmlFor="phoneNumber" className="block text-lg font-medium leading-6 text-gray-900">
              Celular
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button id='updateSubmit' className='bg-primary text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer' type="submit">
              Actualizar
            </button>
          </div>
        </form>
      </article>
      <div className="mx-16 mt-10 max-h-96 p-10 bg-gray-200 shadow-lg rounded-lg">
        <Profile/>
        <div className='flex justify-center'>
          <button id='deleteUser'
          className='bg-primary text-white font-bold py-2 px-20 mt-10 rounded-full cursor-pointer'
          onClick={handleDeleteAccount}>
            Eliminar cuenta
          </button>
        </div>
      </div>
    </main>
  );
};