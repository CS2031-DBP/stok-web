import React from 'react'
import { CreateSale } from '../components/CreateSale'
import SalesPag from '../components/SalesPag'

const Sales = () => {
  return (
    <main className='grid grid-cols-2'>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <CreateSale></CreateSale>
      </div>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <SalesPag></SalesPag>
      </div>

    </main>
  )
}

export default Sales
