import React from 'react';
import { fetchGetOwner, fetchGetEmployee, getRoleBasedOnToken } from '../services/api';
import { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { FaIdCard } from 'react-icons/fa';

export const Profile = () => {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = await getRoleBasedOnToken();
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
        <article className="flex flex-col items-center justify-center">
            <CgProfile className="text-8xl text-gray-600 mt-5" />
            <h1 className='text-4xl font-bold my-5'>
                {profileInfo && (profileInfo.role === 'OWNER' ? 'Owner' : (profileInfo.role === 'EMPLOYEE' ? 'Employee' : 'Perfil'))}
            </h1>
            <section className='bg-white p-6 rounded-lg shadow-md text-2xl'>
                <div className="text-lg mb-4">
                    <p className="flex items-center">
                        <FaIdCard className="mr-2" />
                        <strong>ID:</strong> {profileInfo && profileInfo.id}
                    </p>
                    <p className="flex items-center">
                        <BsPerson className="mr-2" />
                        <strong>Name:</strong> {profileInfo && profileInfo.firstName + " " + profileInfo.lastName}
                    </p>
                    <p className="flex items-center">
                        <AiOutlineMail className="mr-2" />
                        <strong>Email:</strong> {profileInfo && profileInfo.email}
                    </p>
                    <p className="flex items-center">
                        <AiOutlinePhone className="mr-2" />
                        <strong>Phone Number:</strong> {profileInfo && profileInfo.phoneNumber}
                    </p>
                </div>
            </section>
        </article>
    );
};