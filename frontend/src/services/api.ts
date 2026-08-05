import axios from 'axios'
import type { AttendanceRecord, AuthResponse, Location, LocationRequest, LoginRequest, RegisterRequest } from '../types/auth'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1', headers: { 'Content-Type': 'application/json' } })
api.interceptors.request.use((config) => { const token = localStorage.getItem('tracksphere.accessToken'); if (token) config.headers.Authorization = `Bearer ${token}`; return config })
export const authApi = { login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data).then(r => r.data), register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data).then(r => r.data), me: () => api.get('/users/me').then(r => r.data) }
export const locationApi = { live: () => api.get<Location[]>('/locations/live').then(r => r.data), history: (vehicleId: string) => api.get<Location[]>(`/locations/${vehicleId}/history`).then(r => r.data), record: (data: LocationRequest) => api.post<Location>('/locations', data).then(r => r.data) }
export const attendanceApi = { clockIn: () => api.post<AttendanceRecord>('/attendance/clock-in').then(r => r.data), clockOut: () => api.post<AttendanceRecord>('/attendance/clock-out').then(r => r.data), today: () => api.get<AttendanceRecord | null>('/attendance/today').then(r => r.data), report: (search = '') => api.get<AttendanceRecord[]>('/attendance/report', { params: { search } }).then(r => r.data) }
export default api
