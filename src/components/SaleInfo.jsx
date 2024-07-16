import React, { useState, useEffect } from 'react';
import { fetchUpdateSale, fetchDeleteSale, fetchGetSale, getRoleBasedOnToken, fetchGetOwner, fetchGetEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SaleInfo = ({ saleId, handleRefresh }) => {
    const [saleInfo, setSaleInfo] = useState(null);
    const [ownerId, setOwnerId] = useState('');
    const [newAmount, setNewAmount] = useState('');
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

    useEffect(() => {
        const fetchSaleInfo = async () => {
            try {
                if (ownerId && saleId) {
                    const saleData = await fetchGetSale(ownerId, saleId);
                    setSaleInfo(saleData);
                    setNewAmount(saleData.amount);
                }
            } catch (error) {
                console.error('Error al obtener la información de la venta:', error);
            }
        };

        fetchSaleInfo();
    }, [ownerId, saleId]);

    const handleUpdateSale = async () => {
        try {
            const updateSaleRequest = {
                ownerId: ownerId,
                saleId: saleInfo.id,
                newAmount: newAmount
            };
            await fetchUpdateSale(updateSaleRequest);
            const updatedSaleData = await fetchGetSale(ownerId, saleInfo.id);
            setSaleInfo(updatedSaleData);
            handleRefresh();
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
        }
    };

    const handleDeleteSale = async () => {
        try {
            await fetchDeleteSale(ownerId, saleInfo.id);
            alert('Venta eliminada exitosamente');
            handleRefresh();
            navigate('/sales');
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    };

    const handleBackToSales = () => {
        navigate('/sales');
    };

    if (!saleInfo) {
        return <p className="text-center text-lg text-red-500">Cargando información de la venta...</p>;
    }

    return (
        <div className="sale-info p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Detalle de la Venta</h2>
            <div className="text-base mb-4">
                <p><strong>ID del Producto:</strong> {saleInfo.inventoryforSaleDto.product.id}</p>
                <p><strong>Nombre del Producto:</strong> {saleInfo.inventoryforSaleDto.product.name}</p>
                <p><strong>Cantidad:</strong> {saleInfo.amount}</p>
                <p><strong>Cantidad Vendida:</strong> {saleInfo.saleCant}</p>
                <p><strong>Fecha:</strong> {new Date(saleInfo.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleDeleteSale}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2"
                >
                    Eliminar Venta
                </button>
            </div>

            <h2 className="text-center text-2xl font-bold leading-7 text-gray-900 mt-6 mb-4">
                Actualizar Venta
            </h2>
            <div className="flex items-center mb-4">
                <label className="block text-gray-700 text-sm font-bold mr-2" htmlFor="newAmount">
                    Nueva Cantidad:
                </label>
                <input
                    type="number"
                    name="newAmount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex justify-center mb-4">
                <button
                    type="button"
                    onClick={handleUpdateSale}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    Actualizar Venta
                </button>
            </div>
        </div>
    );
};

export default SaleInfo;