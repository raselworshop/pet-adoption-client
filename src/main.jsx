import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Modal from 'react-modal';
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import ThemeProvider from './Providers/ThemeProvider.jsx'
import AuthProvider from './Providers/AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';
import FacebookLogin from './Pages/AuthRelated/SocialLogin/FacebookLogin'
import { SidebarProvider } from './components/components/ui/sidebar';

const notify = () => toast('Here is your toast.');

const queryClient = new QueryClient();

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <ThemeProvider>
            <div className='w-full'>
              <RouterProvider router={router} />
              <FacebookLogin />
              <Toaster />
            </div>
          </ThemeProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
