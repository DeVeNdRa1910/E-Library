import { Navigate, Outlet } from 'react-router-dom'
import getToken from '@/lib/getToken';

function AuthLayout() {

  const token = getToken();

  if(token){
    return <Navigate to={'/home'} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout
