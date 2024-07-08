import React from 'react'

export const SaleItem = ({ id, name, amount, saleCant, createdAt }) => {
  return (
    <section id={id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Nombre:</b>
        <p id='origin' className="ml-2 text-gray-900">{name}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Cantidad:</b>
        <p id='departure' className="ml-2 text-gray-900">{amount}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Venta:</b>
        <p id='destination' className="ml-2 text-gray-900">S/. {saleCant.toFixed(2)}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Creado:</b>
        <p id='price' className="ml-2 text-gray-900">{createdAt}</p>
      </div>
    </section>
  )
}
