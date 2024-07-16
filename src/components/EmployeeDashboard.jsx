import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaClipboardList, FaChartLine, FaCashRegister } from 'react-icons/fa';
import { getRoleBasedOnToken, fetchGetEmployee } from '../services/api';

export const EmployeeDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => (e) => {
        e.preventDefault();
        try {
            navigate(path);
        } catch (err) {
            console.error(`Error durante la navegación a ${path}`, err);
        }
    };

    return (
        <div className="h-full bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-5">DASHBOARD</h1>
            <nav className="flex flex-col space-y-2">
                <Button
                    variant="link"
                    onClick={handleNavigation('/dashboard')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaClipboardList className="mr-2" /> Dashboard
                </Button>
                <Button
                    variant="link"
                    onClick={handleNavigation('/inventories')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaChartLine className="mr-2" /> Inventories
                </Button>
                <Button
                    variant="link"
                    onClick={handleNavigation('/sales')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaCashRegister className="mr-2" /> Sales
                </Button>
            </nav>
        </div>
    );
};