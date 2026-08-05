import axios from 'axios'
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1', headers: { 'Content-Type': 'application/json' } })
api.interceptors.request.use((config) => { const token = localStorage.getItem('tracksphere.accessToken'); if (token) config.headers.Authorization = `Bearer ${token}`; return config })
export const authApi = { login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data).then(r => r.data), register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data).then(r => r.data), me: () => api.get('/users/me').then(r => r.data) }
export default api
