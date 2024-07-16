import React, { useState } from 'react';
import CreateSupplier from '../components/CreateSupplier';
import SupplierPag from '../components/SupplierPag';
import NavBar from '../components/NavBar';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OwnerDashboard } from '../components/OwnerDashboard';

const Suppliers = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <NavBar />
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
        </div>
    );
}

export default Suppliers;