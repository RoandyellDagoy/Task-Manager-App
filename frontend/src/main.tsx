import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from "./App.tsx";
import { AuthProvider } from './context/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthProvider>
)
