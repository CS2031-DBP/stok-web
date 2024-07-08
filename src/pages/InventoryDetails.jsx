import React from 'react'
import InventoryInfo from '../components/InventoryInfo'
import EditInventoryForm from '../components/EditInventoryForm'

const InventoryDetails = () => {
  return (
    <main className='grid grid-cols-2'>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <InventoryInfo></InventoryInfo>
      </div>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <EditInventoryForm></EditInventoryForm>
      </div>

    </main>
  )
}

export default InventoryDetails