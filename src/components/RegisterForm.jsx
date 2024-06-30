import React from 'react'
import { fetchRegister } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const RegisterForm = () => {
    // firstName, lastName, email, password, isOwner, phoneNumber
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
        const response = await fetchRegister(firstName, lastName, email, password, isOwner, phoneNumber);
        localStorage.setItem('token', response.token);
        navigate('/login');

        console.log(response.token);
        } catch (error) {
        console.log(error);
        }
    }

  return (
    <>
    <form onSubmit={handleRegister}>
      <label>First Name</label>
      <input onChange={(e) => setFirstName(e.target.value)} value={firstName} />

      <label>Last Name</label>
      <input onChange={(e) => setLastName(e.target.value)} value={lastName} />

      <label>Email</label>
      <input onChange={(e) => setEmail(e.target.value)} type='email' value={email} />

      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type='password' value={password} />
      
      <label>Are you an Owner?</label>
      <div>
        <input  
          type="radio"
          id="owner"
          name="isOwner"
          value="owner"
          checked={isOwner === true}
          onChange={() => setIsOwner(true)}
        />
        <label htmlFor="owner">Yes</label>
      </div>
      <div>
        <input
          type="radio"
          id="employee"
          name="isOwner"
          value="employee"
          checked={isOwner === false}
          onChange={() => setIsOwner(false)}
        />
        <label htmlFor="employee">No</label>
      </div>

      <label>Phone Number</label>
      <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />

      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default RegisterForm