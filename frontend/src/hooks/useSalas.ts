/**
 * React Query hooks para Salas
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { salasService } from '../services/sala.service';
import type { ISala } from '../models/sala.model';

// Query Keys
export const salaKeys = {
    all: ['salas'] as const,
    detail: (id: string | number) => ['salas', id] as const,
    byStatus: (status: string) => ['salas', 'status', status] as const,
    byTipo: (tipo: string) => ['salas', 'tipo', tipo] as const,
};

/**
 * Hook para buscar todas as salas
 */
export const useSalas = () => {
    return useQuery({
        queryKey: salaKeys.all,
        queryFn: () => salasService.findAll(),
    });
};

/**
 * Hook para buscar sala por ID
 */
export const useSala = (id: string | number) => {
    return useQuery({
        queryKey: salaKeys.detail(id),
        queryFn: () => salasService.findById(id),
        enabled: !!id,
    });
};

/**
 * Hook para buscar salas por status
 */
export const useSalasByStatus = (status: 'ativa' | 'inativa' | 'manutencao') => {
    return useQuery({
        queryKey: salaKeys.byStatus(status),
        queryFn: () => salasService.findByStatus(status),
    });
};

/**
 * Hook para criar sala
 */
export const useCreateSala = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sala: Omit<ISala, 'id'>) => salasService.create(sala),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: salaKeys.all });
        },
    });
};

/**
 * Hook para atualizar sala
 */
export const useUpdateSala = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<ISala> }) =>
            salasService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: salaKeys.all });
            queryClient.invalidateQueries({ queryKey: salaKeys.detail(variables.id) });
        },
    });
};

/**
 * Hook para deletar sala
 */
export const useDeleteSala = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => salasService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: salaKeys.all });
        },
    });
};
