import React from 'react';
import { Profile } from '../components/Profile';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';
import NavBar from '../components/NavBar';

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
        <div>
            <NavBar />
            <main className="flex h-screen">
                <div className="w-1/6 h-full">
                    {role === 'ROLE_OWNER' ? <OwnerDashboard /> : <EmployeeDashboard />}
                </div>
                <div className="w-5/6 h-full bg-white text-black">
                    <Profile />
                    <div className="flex justify-center">
                        <button
                            id="editProfile"
                            className="bg-primary text-white font-bold py-2 px-20 mt-5 rounded-full cursor-pointer"
                            onClick={handleEditProfile}
                        >
                            Editar
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;