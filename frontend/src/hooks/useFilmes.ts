/**
 * React Query hooks para Filmes
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { filmesService } from '../services/filme.service';
import type { IFilme } from '../models/filme.model';

// Query Keys
export const filmeKeys = {
    all: ['filmes'] as const,
    detail: (id: string | number) => ['filmes', id] as const,
    byStatus: (status: string) => ['filmes', 'status', status] as const,
    byGenero: (genero: string) => ['filmes', 'genero', genero] as const,
};

/**
 * Hook para buscar todos os filmes
 */
export const useFilmes = () => {
    return useQuery({
        queryKey: filmeKeys.all,
        queryFn: () => filmesService.findAll(),
    });
};

/**
 * Hook para buscar filme por ID
 */
export const useFilme = (id: string | number) => {
    return useQuery({
        queryKey: filmeKeys.detail(id),
        queryFn: () => filmesService.findById(id),
        enabled: !!id, // Só executa se tiver ID
    });
};

/**
 * Hook para buscar filmes por status
 */
export const useFilmesByStatus = (status: 'em-cartaz' | 'em-breve' | 'fora-cartaz') => {
    return useQuery({
        queryKey: filmeKeys.byStatus(status),
        queryFn: () => filmesService.findByStatus(status),
    });
};

/**
 * Hook para criar filme
 */
export const useCreateFilme = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (filme: Omit<IFilme, 'id'>) => filmesService.create(filme),
        onSuccess: () => {
            // Invalida cache para recarregar lista
            queryClient.invalidateQueries({ queryKey: filmeKeys.all });
        },
    });
};

/**
 * Hook para atualizar filme
 */
export const useUpdateFilme = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<IFilme> }) =>
            filmesService.update(id, data),
        onSuccess: (_, variables) => {
            // Invalida cache da lista e do item específico
            queryClient.invalidateQueries({ queryKey: filmeKeys.all });
            queryClient.invalidateQueries({ queryKey: filmeKeys.detail(variables.id) });
        },
    });
};

/**
 * Hook para deletar filme
 */
export const useDeleteFilme = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => filmesService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: filmeKeys.all });
        },
    });
};
