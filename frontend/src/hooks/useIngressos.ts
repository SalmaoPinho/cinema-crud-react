/**
 * React Query hooks para Ingressos
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ingressosService } from '../services/ingresso.service';
import type { IIngresso } from '../models/ingresso.model';

// Query Keys
export const ingressoKeys = {
    all: ['ingressos'] as const,
    detail: (id: string | number) => ['ingressos', id] as const,
    bySessao: (sessaoId: string) => ['ingressos', 'sessao', sessaoId] as const,
    byStatus: (status: string) => ['ingressos', 'status', status] as const,
};

/**
 * Hook para buscar todos os ingressos
 */
export const useIngressos = () => {
    return useQuery({
        queryKey: ingressoKeys.all,
        queryFn: () => ingressosService.findAll(),
    });
};

/**
 * Hook para buscar ingresso por ID
 */
export const useIngresso = (id: string | number) => {
    return useQuery({
        queryKey: ingressoKeys.detail(id),
        queryFn: () => ingressosService.findById(id),
        enabled: !!id,
    });
};

/**
 * Hook para buscar ingressos por sessão
 */
export const useIngressosBySessao = (sessaoId: string) => {
    return useQuery({
        queryKey: ingressoKeys.bySessao(sessaoId),
        queryFn: () => ingressosService.findBySessaoId(sessaoId),
        enabled: !!sessaoId,
    });
};

/**
 * Hook para buscar ingressos por status de pagamento
 */
export const useIngressosByStatus = (status: 'pendente' | 'pago' | 'cancelado' | 'reembolsado') => {
    return useQuery({
        queryKey: ingressoKeys.byStatus(status),
        queryFn: () => ingressosService.findByStatusPagamento(status),
    });
};

/**
 * Hook para criar ingresso
 */
export const useCreateIngresso = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ingresso: Omit<IIngresso, 'id'>) => ingressosService.create(ingresso),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ingressoKeys.all });
        },
    });
};

/**
 * Hook para atualizar ingresso
 */
export const useUpdateIngresso = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: Partial<IIngresso> }) =>
            ingressosService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ingressoKeys.all });
            queryClient.invalidateQueries({ queryKey: ingressoKeys.detail(variables.id) });
        },
    });
};

/**
 * Hook para deletar ingresso
 */
export const useDeleteIngresso = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string | number) => ingressosService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ingressoKeys.all });
        },
    });
};

/**
 * Hook para estatísticas de ingressos
 */
export const useIngressosStats = () => {
    return useQuery({
        queryKey: ['ingressos', 'stats'],
        queryFn: async () => {
            const [vendidos, receita] = await Promise.all([
                ingressosService.countVendidos(),
                ingressosService.calcularReceitaTotal(),
            ]);
            return { vendidos, receita };
        },
    });
};
