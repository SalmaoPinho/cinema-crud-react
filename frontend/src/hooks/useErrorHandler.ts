/**
 * Hook para tratamento de erros
 */

import { useToast } from '../components/Toast';
import { useCallback } from 'react';

export class ApiError extends Error {
    status: number;
    data?: unknown;

    constructor(
        status: number,
        message: string,
        data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

export const useErrorHandler = () => {
    const { showError, showWarning } = useToast();

    const handleError = useCallback((error: unknown, customMessage?: string) => {
        console.error('Erro capturado:', error);

        if (error instanceof ApiError) {
            // Erro de API
            if (error.status === 404) {
                showError(customMessage || 'Recurso não encontrado');
            } else if (error.status === 401) {
                showError('Você não tem permissão para acessar este recurso');
            } else if (error.status === 500) {
                showError('Erro no servidor. Tente novamente mais tarde');
            } else {
                showError(customMessage || error.message);
            }
        } else if (error instanceof Error) {
            // Erro genérico
            showError(customMessage || error.message);
        } else {
            // Erro desconhecido
            showError(customMessage || 'Ocorreu um erro inesperado');
        }
    }, [showError]);

    const handleWarning = useCallback((message: string) => {
        showWarning(message);
    }, [showWarning]);

    return { handleError, handleWarning };
};
