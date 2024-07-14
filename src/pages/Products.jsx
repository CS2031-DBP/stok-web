import React, { useState, useEffect } from 'react';
import { CreateProduct } from '../components/CreateProduct';
import Inventories from '../components/Inventories';

const Products = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <main className='grid grid-cols-2'>
      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <CreateProduct onProductCreated={handleRefresh} />
      </div>
      <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <Inventories page={page} setPage={setPage} size={size} setSize={setSize} refresh={refresh} />
      </div>
    </main>
  );
}

export default Products;