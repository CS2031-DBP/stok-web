import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGetInventory, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchReduceInventory, fetchIncreaseInventory, fetchDeleteInventory } from '../services/api';

const InventoryInfo = () => {
  const [inventoryInfo, setInventoryInfo] = useState(null);
  const [ownerId, setOwnerId] = useState('');
  const [inventoryId, setInventoryId] = useState(null);
  const [quantity, setQuantity] = useState(0); // New state for quantity

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
    const fetchInventoryInfo = async () => {
      try {
        if (ownerId && inventoryId) {
          const inventoryData = await fetchGetInventory(ownerId, inventoryId);
          setInventoryInfo(inventoryData);
        }
      } catch (error) {
        console.error('Error al obtener la información del inventario:', error);
      }
    };

    fetchInventoryInfo();
  }, [ownerId, inventoryId]);

  const handleReduceStock = async () => {
    try {
      await fetchReduceInventory(ownerId, inventoryId, quantity);
      const updatedInventoryData = await fetchGetInventory(ownerId, inventoryId);
      setInventoryInfo(updatedInventoryData);
    } catch (error) {
      console.error('Error al reducir el stock:', error);
    }
  };

  const handleIncreaseStock = async () => {
    try {
      await fetchIncreaseInventory(ownerId, inventoryId, quantity);
      const updatedInventoryData = await fetchGetInventory(ownerId, inventoryId);
      setInventoryInfo(updatedInventoryData);
    } catch (error) {
      console.error('Error al aumentar el stock:', error);
    }
  };

  const handleDeleteInventory = async () => {
    try {
      await fetchDeleteInventory(inventoryId, ownerId);
      alert('Inventario eliminado exitosamente');
      navigate('/products');
    } catch (error) {
      console.error('Error al eliminar el inventario:', error);
    }
  };

  const handleBackToInventories = () => {
    navigate('/products');
  };

  if (!inventoryInfo) {
    return <p className="text-center text-lg text-red-500">Cargando información del inventario...</p>;
  }

  return (
    <section className="mx-16 mt-10 p-14 bg-gray-200 shadow-lg rounded-lg">
      <h1 className="text-center text-4xl font-bold leading-7 text-gray-900 m-9 my-12">
        Información del Inventario
      </h1>
        <div className="inventory-info bg-white p-6 rounded-lg shadow-md mx-auto max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6">{inventoryInfo.product.name}</h2>
            <div className="text-base mb-4">
              <p><strong>ID del Producto:</strong> {inventoryInfo.product.id}</p>
              <p><strong>Descripción:</strong> {inventoryInfo.product.description}</p>
              <p><strong>Precio:</strong> ${inventoryInfo.product.price}</p>
              <p><strong>Categoría:</strong> {inventoryInfo.product.category}</p>
              <p><strong>Stock:</strong> {inventoryInfo.stock}</p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleBackToInventories}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Volver a Inventarios
              </button>
            </div>
      </div>

      <h2 className="text-center text-3xl font-bold leading-7 text-gray-900 m-9 my-12">
        Aumentar o Reducir Stock
      </h2>
      <div className="flex items-center mb-4">
        <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="quantity">
          Cantidad:
        </label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleReduceStock}
          className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reducir Stock
        </button>
        <button
          type="button"
          onClick={handleIncreaseStock}
          className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Aumentar Stock
        </button>
      </div>

      <div className="flex items-center justify-center mb-4">
        <button
          type="button"
          onClick={handleDeleteInventory}
          className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Eliminar Inventario
        </button>
      </div>
    </section>
  );
};

export default InventoryInfo;