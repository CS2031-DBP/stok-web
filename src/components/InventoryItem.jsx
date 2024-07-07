import React from 'react'

export const InventoryItem = ({ id, name, description, price, category, stock }) => {
  return (
    <section id={id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Nombre:</b>
        <p id='origin' className="ml-2 text-gray-900">{name}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Descripción:</b>
        <p id='departure' className="ml-2 text-gray-900">{description}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Precio:</b>
        <p id='destination' className="ml-2 text-gray-900">S/.{price.toFixed(2)}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Categoría:</b>
        <p id='price' className="ml-2 text-gray-900">{category}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Stock:</b>
        <p id='stock' className="ml-2 text-gray-900">{stock}</p>
      </div>
    </section>
  )
}
