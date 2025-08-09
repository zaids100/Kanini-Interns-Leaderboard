import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext';
import { AdminProvider } from './contexts/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <AdminProvider>
    <App />
    </AdminProvider>
  </UserProvider>,
)
