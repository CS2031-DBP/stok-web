import React from 'react';
import { Profile } from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';

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
        <main className='grid grid-cols-2'>
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

            <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
                {role ? (
                    role === 'ROLE_OWNER' ? <OwnerDashboard /> : <EmployeeDashboard />
                ) : (
                    <p className="text-center text-lg text-red-500">Cargando...</p>
                )}
            </div>
        </main>
    );
};

export default Dashboard;
