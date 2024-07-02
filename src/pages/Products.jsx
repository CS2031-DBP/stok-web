import React from 'react'
import { CreateProduct } from '../components/CreateProduct'
import Inventories from '../components/Inventories'

const Products = () => {
  return (
    <main className='grid grid-cols-2'>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <CreateProduct/>
      </div>

      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <Inventories></Inventories>
      </div>

    </main>
  )
}

export default Products