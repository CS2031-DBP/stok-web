import axios from "axios";

const BACKEND_URL = 'http://3.81.112.236:8080';

export const fetchLogin = async(username, password) => {

    const response = await axios.post(`${BACKEND_URL}/auth/login`, {username, password});

    return response.data;

}