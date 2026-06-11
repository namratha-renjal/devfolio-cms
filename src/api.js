import axios from "axios"
import { jwtDecode } from 'jwt-decode'

export const BASE_URL = "http://localhost:8000/"

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access")
    if (token) {
        const decodedToken= jwtDecode(token)
        const expiry_date = decodedToken.exp * 1000
        const current_date = Date.now()
        if (expiry_date > current_date){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

export default api