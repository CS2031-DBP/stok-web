import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = 'http://localhost:8080';

export const getRoleBasedOnToken = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  }

export const fetchLogin = async(username, password) => {

    const response = await axios.post(`${BACKEND_URL}/auth/login`, {username, password});

    return response.data;

}

export const fetchRegister = async (firstName, lastName, email, password, isOwner, phoneNumber) => {

    const response = await axios.post(`${BACKEND_URL}/auth/register`, { firstName, lastName, email, password, isOwner, phoneNumber });

    return response.data;
};

export const fetchGetOwner = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/owner/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error en getPassenger:', error);
      throw error;
    }
  };

  export const fetchGetEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/employees/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error en getPassenger:', error);
      throw error;
    }
  };