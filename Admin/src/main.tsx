import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/router.tsx'
import { Toaster } from './components/ui/toaster'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/> 
       {/*Now RouterProvider is our App */}
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
