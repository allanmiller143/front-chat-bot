import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomThemeProvider } from './Theme/CustomThemeProvider'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider>
      <App />
      <Toaster richColors position='top-right' /> {/* Props opcionais para personalizar o estilo */}
    </CustomThemeProvider>
  </StrictMode>,
)
