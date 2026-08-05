import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'

const theme = createTheme({ palette: { primary: { main: '#155eef' }, secondary: { main: '#12b76a' }, background: { default: '#f8fafc' } }, shape: { borderRadius: 10 }, typography: { fontFamily: 'Inter, system-ui, sans-serif', h4: { fontWeight: 700 } } })
createRoot(document.getElementById('root')!).render(<StrictMode><ThemeProvider theme={theme}><CssBaseline/><BrowserRouter><AuthProvider><App/></AuthProvider></BrowserRouter></ThemeProvider></StrictMode>)
