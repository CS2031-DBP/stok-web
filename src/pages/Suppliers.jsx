import React, { useState, useEffect } from 'react';
import CreateSupplier from '../components/CreateSupplier';
import SupplierPag from '../components/SupplierPag';
import NavBar from '../components/NavBar';
import { Button, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { getRoleBasedOnToken, fetchGetOwner } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Suppliers = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = await getRoleBasedOnToken();
                setRole(role);

                if (role === 'ROLE_OWNER') {
                    const ownerData = await fetchGetOwner();
                    setOwnerId(ownerData.id);
                } else {
                    setError('No tienes permisos para acceder a esta página.');
                }
            } catch (error) {
                console.error('Error fetching profile information:', error);
                navigate('/login');
            }
        };

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchProfileInfo();
        }
    }, [navigate]);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <NavBar />
            {error ? (
                <div className="flex-grow flex items-center justify-center">
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                </div>
            ) : (
                <main className="flex h-screen">
                    <div className="w-1/6 h-full">
                        <OwnerDashboard />
                    </div>
                    <div className="w-5/6 h-full bg-light">
                        <div className="container mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className='text-4xl'>Gestión de Proveedores</h1>
                                <Button variant="primary" onClick={handleShowModal}>
                                    Agregar Proveedor
                                </Button>
                            </div>
                            <SupplierPag page={page} setPage={setPage} size={size} setSize={setSize} refresh={refresh} />
                        </div>

                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Crear Proveedor</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateSupplier onSupplierCreated={() => {
                                    handleRefresh();
                                    handleCloseModal();
                                }} />
                            </Modal.Body>
                        </Modal>
                    </div>
                </main>
            )}
        </div>
    );
}

export default Suppliers;