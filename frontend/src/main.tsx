import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'

const theme = createTheme({ palette: { primary: { main: '#3652e5', dark: '#2537b7', light: '#edf0ff' }, secondary: { main: '#16a86b' }, background: { default: '#f6f7fb', paper: '#ffffff' }, text: { primary: '#11152e', secondary: '#667085' } }, shape: { borderRadius: 16 }, typography: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', h4: { fontWeight: 800, letterSpacing: '-0.035em' }, h5: { fontWeight: 750, letterSpacing: '-0.025em' }, button: { fontWeight: 700, textTransform: 'none' } }, components: { MuiCard: { styleOverrides: { root: { boxShadow: '0 1px 2px rgba(16, 24, 40, .04)', borderColor: '#e9eaf2' } } }, MuiButton: { styleOverrides: { root: { borderRadius: 10 } } } } })
createRoot(document.getElementById('root')!).render(<StrictMode><ThemeProvider theme={theme}><CssBaseline/><BrowserRouter><AuthProvider><App/></AuthProvider></BrowserRouter></ThemeProvider></StrictMode>)
