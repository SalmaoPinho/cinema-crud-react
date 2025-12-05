/**
 * React Query hooks para Sessões
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessoesService } from '../services/sessao.service';
import type { ISessao } from '../models/sessao.model';

// Query Keys
export const sessaoKeys = {
    all: ['sessoes'] as const,
    detail: (id: string | number) => ['sessoes', id] as const,
    byFilme: (filmeId: string) => ['sessoes', 'filme', filmeId] as const,
    bySala: (salaId: string) => ['sessoes', 'sala', salaId] as const,
    today: ['sessoes', 'today'] as const,
};

/**
 * Hook para buscar todas as sessões
 */
export const useSessoes = () => {
    return useQuery({
        queryKey: sessaoKeys.all,
        queryFn: () => sessoesService.findAll(),
    });
};

/**
 * Hook para buscar sessão por ID
 */
export const useSessao = (id: string | number) => {
    return useQuery({
        queryKey: sessaoKeys.detail(id),
        queryFn: () => sessoesService.findById(id),
        enabled: !!id,
    });
};

/**
 * Hook para buscar sessões por filme
 */
export const useSessoesByFilme = (filmeId: string) => {
    return useQuery({
        queryKey: sessaoKeys.byFilme(filmeId),
        queryFn: () => sessoesService.findByFilmeId(filmeId),
        enabled: !!filmeId,
    });
};

/**
 * Hook para buscar sessões por sala
 */
export const useSessoesBySala = (salaId: string) => {
    return useQuery({
        queryKey: sessaoKeys.bySala(salaId),
        queryFn: () => sessoesService.findBySalaId(salaId),
        enabled: !!salaId,
    });
};

/**
 * Hook para buscar sessões de hoje
 */
export const useSessoesToday = () => {
    return useQuery({
        queryKey: sessaoKeys.today,
        queryFn: () => sessoesService.findToday(),
    });
};

/**
 * Hook para criar sessão
 */
export const useCreateSessao = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sessao: Omit<ISessao, 'id'>) => sessoesService.create(sessao),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: sessaoKeys.all });
        },
    });
};

/**
 * Hook para atualizar sessão
 */
export const useUpdateSessao = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<ISessao> }) =>
            sessoesService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: sessaoKeys.all });
            queryClient.invalidateQueries({ queryKey: sessaoKeys.detail(variables.id) });
        },
    });
};

/**
 * Hook para deletar sessão
 */
export const useDeleteSessao = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => sessoesService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: sessaoKeys.all });
        },
    });
};
