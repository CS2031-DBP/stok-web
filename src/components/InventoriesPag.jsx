import React, { useState, useEffect } from 'react';
import { fetchgetInventories, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { Button, Table, Pagination, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import InventoryInfo from './InventoryInfo';

const InventoriesPag = ({ page, setPage, size, setSize, refresh, handleRefresh }) => {
    const [inventories, setInventories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    const data = await fetchgetInventories(profileData.id, page, size);
                    setInventories(data.content);
                    setTotalPages(Math.min(data.totalPages, 10));
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    const data = await fetchgetInventories(profileData.owner.id, page, size);
                    setInventories(data.content);
                    setTotalPages(Math.min(data.totalPages, 10));
                }
            } catch (error) {
                console.error('Error al obtener los inventarios:', error);
            }
        };

        fetchInventories();
    }, [page, size, refresh]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };

    const handleViewDetails = (inventory) => {
        setSelectedInventory(inventory);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInventory(null);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Pagination>
                    <Pagination.Prev 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 0}
                    >
                        Anterior
                    </Pagination.Prev>
                    <Pagination.Item disabled>{page + 1} de {totalPages}</Pagination.Item>
                    <Pagination.Next 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page >= totalPages - 1}
                    >
                        Siguiente
                    </Pagination.Next>
                </Pagination>
                <div className="d-flex align-items-center">
                    <label className="mr-2">Tamaño de página:</label>
                    <input 
                        type="number" 
                        value={size} 
                        onChange={handleSizeChange} 
                        min="1"
                        className="form-control w-auto"
                    />
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.length > 0 ? (
                        inventories.map((inventory, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{inventory.product.name}</td>
                                <td>{inventory.product.description}</td>
                                <td>{inventory.product.price}</td>
                                <td>{inventory.product.category}</td>
                                <td>{inventory.stock}</td>
                                <td>
                                    <Button 
                                        variant="primary"
                                        onClick={() => handleViewDetails(inventory)}
                                    >
                                        Ver Detalles
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-danger">No se encontraron Productos.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Información del Inventario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInventory && <InventoryInfo inventory={selectedInventory} handleRefresh={handleRefresh} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );    
};

export default InventoriesPag;