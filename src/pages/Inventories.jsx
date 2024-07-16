import React, { useState, useEffect } from 'react';
import { CreateInventory } from '../components/CreateInventory';
import InventoriesPag from '../components/InventoriesPag';
import NavBar from '../components/NavBar';
import { OwnerDashboard } from '../components/OwnerDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { getRoleBasedOnToken } from '../services/api';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inventories = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          {role === 'ROLE_OWNER' ? <OwnerDashboard /> : <EmployeeDashboard />}
        </div>
        <div className="w-5/6 overflow-auto">
          <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className='text-4xl'>Gestión de Inventarios</h1>
              <Button variant="primary" onClick={handleShowModal}>
                Agregar Inventario
              </Button>
            </div>
            <InventoriesPag page={page} setPage={setPage} size={size} setSize={setSize} refresh={refresh} handleRefresh={handleRefresh} />
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateInventory onInventoryCreated={() => {
            handleRefresh();
            handleCloseModal();
          }} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Inventories;