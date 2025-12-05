/**
 * React Query hooks para Lanches
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lanchesService } from '../services/lanche.service';
import type { ILanche } from '../models/lanche.model';

// Query Keys
export const lancheKeys = {
    all: ['lanches'] as const,
    detail: (id: string | number) => ['lanches', id] as const,
};

/**
 * Hook para buscar todos os lanches
 */
export const useLanches = () => {
    return useQuery({
        queryKey: lancheKeys.all,
        queryFn: () => lanchesService.findAll(),
    });
};

/**
 * Hook para buscar lanche por ID
 */
export const useLanche = (id: string | number) => {
    return useQuery({
        queryKey: lancheKeys.detail(id),
        queryFn: () => lanchesService.findById(id),
        enabled: !!id,
    });
};

/**
 * Hook para criar lanche
 */
export const useCreateLanche = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lanche: Omit<ILanche, 'id'>) => lanchesService.create(lanche),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lancheKeys.all });
        },
    });
};

/**
 * Hook para atualizar lanche
 */
export const useUpdateLanche = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<ILanche> }) =>
            lanchesService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: lancheKeys.all });
            queryClient.invalidateQueries({ queryKey: lancheKeys.detail(variables.id) });
        },
    });
};

/**
 * Hook para deletar lanche
 */
export const useDeleteLanche = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => lanchesService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: lancheKeys.all });
        },
    });
};
