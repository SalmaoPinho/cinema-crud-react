/**
 * Constantes de rotas da aplicação
 */

export const ROUTES = {
    HOME: '/home',
    LOGIN: '/login',
    FILMES: '/filmes',
    SALAS: '/salas',
    SESSOES: '/sessoes',
    INGRESSOS: '/ingressos',
    LANCHES: '/lanches',
    PROGRAMACAO: '/prog',
} as const;

// Type helper para garantir type-safety nas rotas
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

// Helper para navegação programática
export const getRoute = (route: keyof typeof ROUTES): string => {
    return ROUTES[route];
};
