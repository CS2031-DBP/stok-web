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
    <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Sales</h1>
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
            <section id='Sales'>
                {sales.length > 0 ? (
                    sales.map((sale, index) => (
                        <SaleItem
                            key={index}
                            id={sale.id}
                            name={sale.inventoryforSaleDto.product.name}
                            amount={sale.amount}
                            saleCant={sale.saleCant}
                            createdAt={sale.createdAt}
                        />
                    ))
                ) : (
                    <p className="text-center text-lg text-red-500">No se encontraron Sales.</p>
                )}
            </section>
        </section>
  )
}

export default SalesPag
