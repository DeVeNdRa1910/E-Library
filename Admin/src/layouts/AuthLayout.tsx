
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

function AuthLayout() {

  const token = Cookies.get('token');

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
