import React, { useState, useEffect } from 'react';
import { fetchAddProduct, fetchCreateInventory, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState(null);
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileInfo = async () => {
          try {
            const role = getRoleBasedOnToken();
            let profileData;
    
            if (role === 'ROLE_OWNER') {
              profileData = await fetchGetOwner();
              console.log(profileData)
              setOwnerId(profileData.id)
            } else if (role === 'ROLE_EMPLOYEE') {
                profileData = await fetchGetEmployee();
                console.log(profileData)
                setOwnerId(profileData.owner.id)
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
          const product = await fetchAddProduct(name, description, price, category);
          console.log(product);
          const inventoryResponse = await fetchCreateInventory(ownerId, product.id, quantity);
          console.log(inventoryResponse);
          navigate('/products')
        } catch (error) {
          console.log(error);
          setError('Error durante la creación de Producto');
        }
    }

    return (
        <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
            <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">Crear Producto</h1>
            <form onSubmit={handleSubmit}>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="name" className="block text-lg font-medium leading-6 text-gray-900">
                        Nombre del Producto
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={(e) => { setName(e.target.value) }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="description" className="block text-lg font-medium leading-6 text-gray-900">
                        Descripción
                    </label>
                    <div className="mt-2">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            onChange={(e) => { setDescription(e.target.value) }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="price" className="block text-lg font-medium leading-6 text-gray-900">
                        Precio
                    </label>
                    <div className="mt-2">
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="any"
                            onChange={(e) => { setPrice(parseFloat(e.target.value)) }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="category" className="block text-lg font-medium leading-6 text-gray-900">
                        Categoría
                    </label>
                    <div className="mt-2">
                        <select
                            id="category"
                            name="category"
                            onChange={(e) => { setCategory(e.target.value) }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Galleta">Galleta</option>
                            <option value="Bebida">Bebida</option>
                            <option value="Dulce">Dulce</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Fritura">Fritura</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="quantity" className="block text-lg font-medium leading-6 text-gray-900">
                        Cantidad
                    </label>
                    <div className="mt-2">
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            onChange={(e) => { setQuantity(e.target.value) }}
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
                        Crear Producto
                    </button>
                </div>
            </form>
        </section>
    )
}