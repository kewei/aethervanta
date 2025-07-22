import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "@/assets/css/globals.css"; 
// import './index.css';
import App from './App.jsx';
import AppRoutes from '@/routes/index.jsx';
import { AppConfigProvider } from "@/context/AppConfigContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppConfigProvider>
        <App>
        <AppRoutes />
      </App>
      </AppConfigProvider>
    </BrowserRouter>
  </StrictMode>
)
