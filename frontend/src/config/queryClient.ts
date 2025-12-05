/**
 * Configuração do React Query
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos - dados considerados "frescos"
            gcTime: 1000 * 60 * 10, // 10 minutos - tempo no cache
            retry: 1, // Tentar novamente 1 vez em caso de erro
            refetchOnWindowFocus: false, // Não refetch ao focar janela
        },
        mutations: {
            retry: 0, // Não tentar novamente mutations
        },
    },
});
