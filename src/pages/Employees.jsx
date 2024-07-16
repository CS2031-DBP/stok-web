import React, { useState, useEffect } from 'react';
import EmployeesPag from '../components/EmployeesPag';
import NavBar from '../components/NavBar';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { getRoleBasedOnToken, fetchGetOwner } from '../services/api';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssignEmployee from '../components/AssignEmployee';

const Employees = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('');
    const [ownerId, setOwnerId] = useState('');

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = await getRoleBasedOnToken();
                setRole(role);

                if (role === 'ROLE_OWNER') {
                    const ownerData = await fetchGetOwner();
                    setOwnerId(ownerData.id);
                }
            } catch (error) {
                console.error('Error fetching profile information:', error);
            }
        };

        fetchProfileInfo();
    }, []);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-grow overflow-hidden">
                <div className="w-1/6 bg-gray-800 text-white">
                    <OwnerDashboard />
                </div>
                <div className="w-5/6 container mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className='text-4xl'>Gestión de Empleados</h1>
                        <Button variant="primary" onClick={handleShowModal}>
                            Asignar Empleado
                        </Button>
                    </div>
                    <EmployeesPag ownerId={ownerId} page={page} setPage={setPage} size={size} setSize={setSize} refresh={refresh} handleRefresh={handleRefresh} />
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Asignar Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssignEmployee onEmployeeAssigned={() => {
                        handleRefresh();
                        handleCloseModal();
                    }} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Employees;