import React from 'react'

export const SupplierItem = ({ id, name, lastName, email, phoneNumber }) => {
  return (
    <section id={id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Nombre:</b>
        <p id='origin' className="ml-2 text-gray-900">{name}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Email:</b>
        <p id='destination' className="ml-2 text-gray-900">{email}</p>
      </div>

      <div className="flex items-center mb-2">
        <b className="w-32 text-gray-700">Número de teléfono:</b>
        <p id='price' className="ml-2 text-gray-900">{phoneNumber}</p>
      </div>
    </section>
  )
}