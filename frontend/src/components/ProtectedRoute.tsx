import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth, type UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar se o usuário está autenticado mas sem dados válidos
        if (!isAuthenticated || !user || !user.username || !user.role) {
            logout();
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, user, logout, navigate]);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        const redirectPath = user?.role === 'cliente' ? '/prog' : '/home';
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
};
