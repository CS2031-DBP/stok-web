import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGetInventory, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee, fetchReduceInventory, fetchIncreaseInventory, fetchDeleteInventory } from '../services/api';

const InventoryInfo = ({ inventory, handleRefresh }) => {
  const [inventoryInfo, setInventoryInfo] = useState(inventory);
  const [ownerId, setOwnerId] = useState('');
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const role = getRoleBasedOnToken();
        let profileData;

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

  const handleReduceStock = async () => {
    try {
      await fetchReduceInventory(ownerId, inventory.id, quantity);
      const updatedInventoryData = await fetchGetInventory(ownerId, inventory.id);
      setInventoryInfo(updatedInventoryData);
      handleRefresh();
    } catch (error) {
      console.error('Error al reducir el stock:', error);
    }
  };

  const handleIncreaseStock = async () => {
    try {
      await fetchIncreaseInventory(ownerId, inventory.id, quantity);
      const updatedInventoryData = await fetchGetInventory(ownerId, inventory.id);
      setInventoryInfo(updatedInventoryData);
      handleRefresh();
    } catch (error) {
      console.error('Error al aumentar el stock:', error);
    }
  };

  const handleDeleteInventory = async () => {
    try {
      await fetchDeleteInventory(inventory.id, ownerId);
      alert('Inventario eliminado exitosamente');
      handleRefresh();
    } catch (error) {
      console.error('Error al eliminar el inventario:', error);
    }
  };

  if (!inventoryInfo) {
    return <p className="text-center text-lg text-red-500">Cargando información del inventario...</p>;
  }

  return (
    <div className="inventory-info p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">{inventoryInfo.product.name}</h2>
      <div className="text-base mb-4">
        <p><strong>ID del Producto:</strong> {inventoryInfo.product.id}</p>
        <p><strong>Descripción:</strong> {inventoryInfo.product.description}</p>
        <p><strong>Precio:</strong> ${inventoryInfo.product.price}</p>
        <p><strong>Categoría:</strong> {inventoryInfo.product.category}</p>
        <p><strong>Stock:</strong> {inventoryInfo.stock}</p>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleDeleteInventory}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2"
        >
          Eliminar Inventario
        </button>
      </div>

      <h2 className="text-center text-2xl font-bold leading-7 text-gray-900 mt-6 mb-4">
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Reducir Stock
        </button>
        <button
          type="button"
          onClick={handleIncreaseStock}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Aumentar Stock
        </button>
      </div>
    </div>
  );
};

export default InventoryInfo;