import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import ButtonLoading from '@/components/components/ui/ButtonLoading';

const AdminRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin()
  const loaction = useLocation()

  if (loading || isAdminLoading) return <ButtonLoading />
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={'/login'} state={{ from: loaction }} replace  ></Navigate>
};

export default AdminRoute;
