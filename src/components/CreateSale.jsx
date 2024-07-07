import React, { useState, useEffect } from 'react';
import { getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchCreateSale, fetchgetAllInventories } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const CreateSale = () => {
    const [ownerId, setOwnerId] = useState('');
    const [inventoryId, setInventoryId] = useState('');
    const [amount, setAmount] = useState('');
    const [inventories, setInventories] = useState([]);
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const role = getRoleBasedOnToken();
                let profileData;

                if (role === 'ROLE_OWNER') {
                    profileData = await fetchGetOwner();
                    setOwnerId(profileData.id)
                    const inventoriesData = await fetchgetAllInventories(profileData.id);
                    setInventories(inventoriesData);
                } else if (role === 'ROLE_EMPLOYEE') {
                    profileData = await fetchGetEmployee();
                    setOwnerId(profileData.owner.id)
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
            const response = await fetchCreateSale(ownerId, inventoryId, amount);
            console.log(response);
            navigate('/sales');
        } catch (error) {
            console.log(error);
            setError('Error durante la creación de Sale');
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
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Crear Sale</h1>
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
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="amount" className="block text-lg font-medium leading-6 text-gray-900">
                        Cantidad
                    </label>
                    <div className="mt-2">
                        <input
                            id="amount"
                            name="quantity"
                            type="amount"
                            autoComplete="off"
                            onChange={(e) => { setAmount(e.target.value) }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="flex justify-center">
                    <button id="createProductSubmit" className='bg-primary text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer' type="submit">
                        Crear Sale
                    </button>
                </div>
            </form>
        </section>
    );
};