/**
 * ProtectedRoute - Componente para proteger rotas que requerem autenticação
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROUTES } from '../../../routes/constants';

interface ProtectedRouteProps {
    redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = ROUTES.LOGIN }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};
