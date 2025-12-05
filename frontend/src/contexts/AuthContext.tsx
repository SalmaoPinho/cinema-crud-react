import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'cliente' | 'gerente';

export interface User {
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    isGerente: boolean;
    isCliente: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS = [
    { username: 'cliente', password: '123', role: 'cliente' as UserRole },
    { username: 'gerente', password: '123', role: 'gerente' as UserRole }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                // Validar se tem as propriedades necessárias
                if (parsed && parsed.username && parsed.role) {
                    return parsed;
                }
            }
        } catch (error) {
            console.error('Erro ao carregar usuário do localStorage:', error);
            localStorage.removeItem('user');
        }
        return null;
    });

    const login = (username: string, password: string): boolean => {
        const foundUser = USERS.find(
            u => u.username === username && u.password === password
        );

        if (foundUser) {
            const userData: User = {
                username: foundUser.username,
                role: foundUser.role
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isGerente: user?.role === 'gerente',
        isCliente: user?.role === 'cliente'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
