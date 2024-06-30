import React from 'react'
import Profile from '../components/Profile'

const Dashboard = () => {
  return (
    <main>
        <div className="mx-16 mt-10 p-10 bg-gray-200 shadow-lg rounded-lg">
        <Profile />
        <div className='flex justify-center'>
          <button
            id='editProfile'
            className='bg-primary text-white font-bold py-2 px-20 mt-10 rounded-full cursor-pointer'
            //onClick={handleEditProfile}
          >
            Editar
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard