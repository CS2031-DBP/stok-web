import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchgetAllInventories } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const Codebarcomp = () => {
    const [ownerId, setOwnerId] = useState('');
    const [inventoryId, setInventoryId] = useState('');
    const [inventories, setInventories] = useState([]);
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(null);
    const barcodeRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    setOwnerId(profileData.id);
                    const inventoriesData = await fetchgetAllInventories(profileData.id);
                    setInventories(inventoriesData);
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    setOwnerId(profileData.owner.id);
                    const inventoriesData = await fetchgetAllInventories(profileData.owner.id);
                    setInventories(inventoriesData);
                }
            } catch (error) {
                console.error('Error fetching profile information', error);
            }
        };

        fetchProfileInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (inventoryId) {
                JsBarcode(barcodeRef.current, inventoryId.toString(), {
                    format: "CODE128",
                    lineColor: "#000",
                    width: 4,
                    height: 80,
                    displayValue: true
                });
            } else {
                setError('Por favor seleccione un producto.');
            }
        } catch (error) {
            console.log(error);
            setError('Error durante la generación del código de barras');
        }
    }

    const handleSelect = (inventory) => {
        setSearch(inventory.product.name);
        setInventoryId(inventory.id);
        setShowDropdown(false);
    }

    const filteredInventories = inventories.filter(inventory =>
        inventory.product.name && inventory.product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="mx-auto mt-10 p-10 bg-white shadow-lg rounded-lg max-w-4xl">
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 mb-8">Generar Código de Barras</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="search" className="block text-lg font-medium leading-6 text-gray-900">
                        Buscar Producto
                    </label>
                    <div className="mt-2 relative">
                        <input
                            id="search"
                            name="search"
                            type="text"
                            value={search}
                            autoComplete="off"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setShowDropdown(false)}
                            className="block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {showDropdown && filteredInventories.length > 0 && (
                            <ul
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto"
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                {filteredInventories.map(inventory => (
                                    <li
                                        key={inventory.id}
                                        onClick={() => handleSelect(inventory)}
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    >
                                        {inventory.product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' type="submit">
                        Generar
                    </button>
                </div>
            </form>
            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            )}
            <div className="flex justify-center mt-6">
                <svg ref={barcodeRef}></svg>
            </div>
        </section>
    );
};