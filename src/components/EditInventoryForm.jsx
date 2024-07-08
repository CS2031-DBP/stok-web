import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGetInventory, fetchGetProductById, fetchUpdateProduct, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';

const EditInventoryForm = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [ownerId, setOwnerId] = useState('');
  const [inventoryId, setInventoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const role = getRoleBasedOnToken();
        let profileData;
        const storedInventoryId = localStorage.getItem('inventoryId');

        if (!storedInventoryId) {
          console.error('No se encontró el ID del inventario en el localStorage');
          return;
        }

        setInventoryId(storedInventoryId);

        if (role === 'ROLE_OWNER') {
          profileData = await fetchGetOwner();
          setOwnerId(profileData.id);
        } else if (role === 'ROLE_EMPLOYEE') {
          profileData = await fetchGetEmployee();
          setOwnerId(profileData.owner.id);
        }
      } catch (error) {
        console.error('Error al obtener la información del perfil:', error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        if (ownerId && inventoryId) {
          const inventoryData = await fetchGetInventory(ownerId, inventoryId);
          const productData = await fetchGetProductById(inventoryData.product.id);
          setProductInfo(productData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener la información del producto:', error);
      }
    };

    fetchProductInfo();
  }, [ownerId, inventoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchUpdateProduct(productInfo.id, productInfo);
      navigate('/products');
    } catch (error) {
      console.error('Error al actualizar la información del producto:', error);
    }
  };

  if (loading) {
    return <p>Cargando información del producto...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">
        Editar Información del Producto
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre del Producto
        </label>
        <input
          type="text"
          name="name"
          value={productInfo.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          name="description"
          value={productInfo.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Precio
        </label>
        <input
          type="number"
          name="price"
          value={productInfo.price}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Categoría
        </label>
        <input
          type="text"
          name="category"
          value={productInfo.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditInventoryForm;