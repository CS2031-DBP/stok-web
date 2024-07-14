import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaUsers, FaClipboardList, FaBoxes, FaChartLine, FaTruck, FaCashRegister, FaClipboard, FaUser } from 'react-icons/fa';

export const OwnerDashboard = () => {
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
                    onClick={handleNavigation('/products')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaChartLine className="mr-2" /> Products
                </Button>
                <Button
                    variant="link"
                    onClick={handleNavigation('/sales')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaCashRegister className="mr-2" /> Sales
                </Button>
                <Button
                    variant="link"
                    onClick={handleNavigation('/suppliers')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaUser className="mr-2" /> Suppliers
                </Button>
                <Button
                    variant="link"
                    onClick={handleNavigation('/employees')}
                    className="text-left text-white w-full px-4 py-2 flex items-center hover:bg-gray-700"
                >
                    <FaUsers className="mr-2" /> Employees
                </Button>
            </nav>
        </div>
    );
};
