import axios from './root.service.js';

const API_URL = '/postulations';

export async function getPostulations() {
    try {
        const config = {
            headers: {
                'Cache-Control': 'no-cache'
            }
        }
        const { data } = await axios.get(API_URL, config);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function acceptPostulation(id) {
    try {
        const response = await axios.put(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function rejectPostulation(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}