import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = 'http://localhost:8080';

export const getRoleBasedOnToken = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  }

// Auth

export const fetchLogin = async(username, password) => {

    const response = await axios.post(`${BACKEND_URL}/auth/login`, {username, password});

    return response.data;

}

export const fetchRegister = async (firstName, lastName, email, password, isOwner, phoneNumber) => {

    const response = await axios.post(`${BACKEND_URL}/auth/register`, { firstName, lastName, email, password, isOwner, phoneNumber });

    return response.data;
};

// Owner y Employee

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

// Product

export const fetchAddProduct = async (name, description, price, category) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/product/add`, {name, description, price, category},
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchAddProduct:', error);
        throw error;
    }
};

export const fetchGetProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error en fetchGetProduct:', error);
      throw error;
    }
};

export const fetchgetAllProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/product/findall`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error en fetchgetAllProducts:', error);
      throw error;
    }
};

// Inventory

export const fetchCreateInventory = async (ownerId, productId, quantity) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/inventory/create`, {ownerId, productId, quantity},
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchAddProduct:', error);
        throw error;
    }
};

export const fetchgetInventories = async (ownerId, page, size) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/inventory/all/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, size }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error en fetchgetInventories:', error);
      throw error;
    }
};

export const fetchgetAllInventories = async (ownerId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/inventory/owner/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error en fetchgetAllInventories:', error);
      throw error;
    }
};

// Sales

export const fetchCreateSale = async (ownerId, inventoryId, amount) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/sales/create`, {ownerId, inventoryId, amount},
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchCreateSale:', error);
        throw error;
    }
};

export const fetchgetSales = async (ownerId, page, size) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/sales/all/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, size }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error en fetchgetSales:', error);
      throw error;
    }
};

// Supplier

export const fetchCreateSupplier = async (ownerId, firstName, lastName, email, phoneNumber) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/suppliers/create`, {ownerId, firstName, lastName, email, phoneNumber},
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchCreateSupplier:', error);
        throw error;
    }
};

export const fetchAddProductToSupplier = async (ownerId, supplierId, productId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BACKEND_URL}/suppliers/${ownerId}/${supplierId}/${productId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        return response.data;
    } catch (error) {
        console.error('Error en fetchAddProductToSupplier:', error);
        throw error;
    }
};

export const fetchgetSuppliers = async (ownerId, page, size) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/suppliers/allpage/${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, size }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error en fetchgetInventories:', error);
      throw error;
    }
};