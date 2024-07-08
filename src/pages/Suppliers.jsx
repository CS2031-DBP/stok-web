import React from 'react'
import CreateSupplier from '../components/CreateSupplier'
import SupplierPag from '../components/SupplierPag'

const Suppliers = () => {
  return (
    <main className='grid grid-cols-2'>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <SupplierPag></SupplierPag>
      </div>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <CreateSupplier></CreateSupplier>
      </div>

    </main>
  )
}

export default Suppliers
