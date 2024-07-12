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
                    width: 2,
                    height: 40,
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
        <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Codigo de Barras</h1>
            <form onSubmit={handleSubmit}>
                <div className="sm:col-span-4 my-5">
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <button id="createProductSubmit" className='bg-primary text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer' type="submit">
                        Generar
                    </button>
                </div>
            </form>
            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
            <div className="flex justify-center mt-5">
                <svg ref={barcodeRef}></svg>
            </div>
            <div className="flex justify-center">
                <button
                    className="mt-3 text-blue-500 hover:text-blue-600"
                    onClick={() => { navigate('/dashboard') }}
                >
                    Back to Dashboard
                </button>
            </div>
        </section>
    );
};
