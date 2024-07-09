import React, { useState, useEffect } from 'react';
import { fetchgetSales, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { SaleItem } from './SaleItem';

const SalesPag = () => {
    const [sales, setSales] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;
    
                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    const data = await fetchgetSales(profileData.id, page, size);
                    setSales(data.content);
                    setTotalPages(data.totalPages);
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    const data = await fetchgetSales(profileData.owner.id, page, size);
                    setSales(data.content);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error('Error al obtener los Sales:', error);
            }
        };

        fetchSales();
    }, [page, size]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };
    return (
        <section className="mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg max-w-4xl">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">Sales</h1>
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
            <section id='Sales'>
                {sales.length > 0 ? (
                    sales.map((sale, index) => (
                        <div key={index} className="items-center mb-4 p-4 rounded shadow bg-gray-50">
                            <div>
                                <p className="text-lg"><strong>Product:</strong> {sale.inventoryforSaleDto.product.name}</p>
                                <p className="text-lg"><strong>Amount:</strong> {sale.amount}</p>
                                <p className="text-lg"><strong>Quantity Sold:</strong> s/.{sale.saleCant}</p>
                                <p className="text-lg"><strong>Date:</strong> {new Date(sale.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-red-500">No se encontraron Sales.</p>
                )}
            </section>
        </section>
    );    
}

export default SalesPag
