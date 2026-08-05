import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EmployeeDashboardPage from './pages/EmployeeDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ReportsPage from './pages/ReportsPage'
import ProtectedRoute from './components/ProtectedRoute'
export default function App() { return <Routes><Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<EmployeeDashboardPage/>}/><Route path="/admin" element={<AdminDashboardPage/>}/><Route path="/reports" element={<ReportsPage/>}/></Route><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes> }
