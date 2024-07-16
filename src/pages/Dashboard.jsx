import React from 'react';
import { Profile } from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';
import NavBar from '../components/NavBar';
import { Codebarcomp } from '../components/Codebarcomp';

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
                navigate('/login');
            }
        };

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserRole();
        }
    }, [navigate]);

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
            <NavBar />
            <div className="flex h-screen">
                <div className="w-1/6 h-full bg-gray-800 text-white">
                    {role === 'ROLE_OWNER' ? <OwnerDashboard /> : <EmployeeDashboard />}
                </div>
                <div className="w-5/6 h-full bg-white text-black flex items-start justify-center pt-10">
                    <div className="flex flex-col w-1/2 items-center">
                        <Profile />
                        <button
                            id="editProfile"
                            className="bg-primary text-white font-bold py-2 px-20 mt-5 rounded-full cursor-pointer"
                            onClick={handleEditProfile}
                        >
                            Editar
                        </button>
                    </div>
                    <div className="flex flex-col w-1/2 items-center">
                        <Codebarcomp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;