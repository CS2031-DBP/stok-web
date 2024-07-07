import React from 'react'
import { CreateSale } from '../components/CreateSale'

const Sales = () => {
  return (
    <main className='grid grid-cols-2'>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <CreateSale></CreateSale>
      </div>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        
      </div>

    </main>
  )
}

export default Sales
