import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminProvider } from './contexts/AdminContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
createRoot(document.getElementById('root')).render(
  <AdminProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AdminProvider>,
)
