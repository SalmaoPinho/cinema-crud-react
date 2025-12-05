/**
 * Configuração centralizada da API
 */

// Base URL da API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Endpoints da API
export const API_ENDPOINTS = {
    filmes: '/api/filmes',
    salas: '/api/salas',
    sessoes: '/api/sessoes',
    ingressos: '/api/ingressos',
    lanches: '/api/lanches',
    usuarios: '/api/usuarios',
} as const;

// Configuração completa da API
export const API_CONFIG = {
    baseURL: API_BASE_URL,
    endpoints: API_ENDPOINTS,
    timeout: 30000, // 30 segundos
    headers: {
        'Content-Type': 'application/json',
    },
} as const;

// Helper para construir URLs completas
export const buildApiUrl = (endpoint: keyof typeof API_ENDPOINTS, path: string = ''): string => {
    return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}${path}`;
};
