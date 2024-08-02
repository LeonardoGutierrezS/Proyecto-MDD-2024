import axios from './root.service.js'; 

const API_URL = '/products'; 

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, productData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
