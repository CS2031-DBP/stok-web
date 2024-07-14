import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchgetInventories, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { InventoryItem } from './InventoryItem';

const Inventories = ({ page, setPage, size, setSize, refresh }) => {
    const [inventories, setInventories] = useState([]);
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
    }, [page, size, refresh]);

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
        <section className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg max-w-4xl">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">Inventarios</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <button 
                        onClick={() => handlePageChange(page - 1)} 
                        disabled={page === 0}
                        className={`px-4 py-2 font-bold rounded text-white ${page === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}
                    >
                        Anterior
                    </button>
                    <span className="mx-4 text-lg">Página {page + 1} de {totalPages}</span>
                    <button 
                        onClick={() => handlePageChange(page + 1)} 
                        disabled={page >= totalPages - 1}
                        className={`px-4 py-2 font-bold rounded text-white ${page >= totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'}`}
                    >
                        Siguiente
                    </button>
                </div>
                <label className="flex items-center">
                    <span className="text-sm mr-2">Tamaño de página:</span>
                    <input 
                        type="number" 
                        value={size} 
                        onChange={handleSizeChange} 
                        min="1"
                        className="w-16 text-center rounded-md bg-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                    />
                </label>
            </div>
            <section id='Inventories'>
                {inventories.length > 0 ? (
                    inventories.map((inventory, index) => (
                        <div key={index} className="flex justify-between items-center mb-4 p-4 rounded shadow bg-gray-50">
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
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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