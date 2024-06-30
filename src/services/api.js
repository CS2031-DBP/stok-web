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
      console.error('Error en fetchGetOwner:', error);
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
        console.error('Error en fetchGetEmployee:', error);
        throw error;
    }
};

export const fetchUpdateOwner = async (id, ownerInfo) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${BACKEND_URL}/owner/update/${id}`, ownerInfo, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchUpdateOwner:', error);
        throw error;
    }
};

export const fetchUpdateEmployee = async (id, updateEmployeeRequest) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${BACKEND_URL}/employees/update/${id}`, updateEmployeeRequest, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchUpdateEmployee:', error);
        throw error;
    }
};

export const fetchDeleteOwner = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BACKEND_URL}/owner/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchDeleteOwner:', error);
        throw error;
    }
};

export const fetchDeleteEmployee = async (ownerId, employeeId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BACKEND_URL}/employees/delete/${ownerId}/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchDeleteEmployee:', error);
        throw error;
    }
};

export const fetchDeleteOwnEmployee = async (employeeId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BACKEND_URL}/employees/delete/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error en fetchDeleteOwnEmployee:', error);
        throw error;
    }
};

export const fetchAssignEmployee = async (ownerId, employeeId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/employees/assign/${ownerId}/${employeeId}`, 
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchAssignEmployee:', error);
        throw error;
    }
};