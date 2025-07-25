import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchgetInventories, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { InventoryItem } from './InventoryItem';

const Inventories = () => {
    const [inventories, setInventories] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    const data = await fetchgetInventories(profileData.id, page, size);
                    setInventories(data.content);
                    setTotalPages(data.totalPages);
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    const data = await fetchgetInventories(profileData.owner.id, page, size);
                    setInventories(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error('Error al obtener los inventarios:', error);
            }
        };

        fetchInventories();
    }, [page, size]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };

    const handleViewDetails = (productId, inventoryId) => {
        localStorage.setItem('productId', productId);
        localStorage.setItem('inventoryId', inventoryId);
        navigate(`/inventoryDetails`);
    };

    return (
        <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Inventarios</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 0}
                        className={`bg-primary text-white font-bold py-2 px-4 rounded ${page === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                        Anterior
                    </button>
                    <span className="mx-4 text-lg">Página {page + 1} de {totalPages}</span>
                    <button 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page >= totalPages - 1}
                        className={`bg-primary text-white font-bold py-2 px-4 rounded ${page >= totalPages - 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                        Siguiente
                    </button>
                </div>
                <label className="flex items-center">
                    <span className="mr-2 ml-4 text-sm">Tamaño de página:</span>
                    <input 
                        type="number" 
                        value={size} 
                        onChange={handleSizeChange} 
                        min="1"
                        className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </label>
            </div>
            <section id='Inventories'>
                {inventories.length > 0 ? (
                    inventories.map((inventory, index) => (
                        <div key={index} className="inventory-item flex justify-between items-center mb-4 bg-white p-4 rounded shadow-md">
                            <InventoryItem
                                id={inventory.product.id}
                                name={inventory.product.name}
                                description={inventory.product.description}
                                price={inventory.product.price}
                                category={inventory.product.category}
                                stock={inventory.stock}
                            />
                            <button 
                                onClick={() => handleViewDetails(inventory.product.id, inventory.id)}
                                className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            >
                                Ver Detalles
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-red-500">No se encontraron Productos.</p>
                )}
            </section>
        </section>
    );
};

export default Inventories;