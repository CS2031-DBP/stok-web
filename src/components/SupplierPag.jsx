import React, { useState, useEffect } from 'react';
import { fetchgetSuppliers, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { SupplierItem } from './SupplierItem';

const SupplierPag = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    const data = await fetchgetSuppliers(profileData.id, page, size);
                    setSuppliers(data.content);
                    setTotalPages(data.totalPages);
                } else if (role === 'ROLE_EMPLOYEE') {
                    alert("Sin permisos")
                }
            } catch (error) {
                console.error('Error al obtener los Suppliers:', error);
            }
        };

        fetchSuppliers();
    }, [page, size]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };
    return (
        <section className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg max-w-4xl">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">Suppliers</h1>
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
            <section id='Suppliers'>
                {suppliers.length > 0 ? (
                    suppliers.map((supplier, index) => (
                        <SupplierItem
                            key={index}
                            id={supplier.id}
                            name={supplier.firstName + " " + supplier.lastName}
                            email={supplier.email}
                            phoneNumber={supplier.phoneNumber}
                        />
                    ))
                ) : (
                    <p className="text-center text-lg text-red-500">No se encontraron Suppliers.</p>
                )}
            </section>
        </section>
    )
}

export default SupplierPag
