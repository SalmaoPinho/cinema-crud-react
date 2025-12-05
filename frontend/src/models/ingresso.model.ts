import { z } from 'zod';

export interface IIngresso {
    id?: string;
    sessaoId: string;
    usuarioId?: string | null;
    nomeComprador: string;
    emailComprador: string;
    assentoNumero: string;
    tipoBilhete: string;
    preco: number;
    statusPagamento: string;
    createdAt?: string;
    updatedAt?: string;
}

export const ingressoSchema = z.object({
    id: z.string().optional(),
    sessaoId: z.string().min(1, 'A sessão é obrigatória'),
    usuarioId: z.string().optional().nullable(),
    nomeComprador: z.string()
        .min(1, 'O nome do comprador é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    emailComprador: z.string()
        .email('Email inválido'),
    assentoNumero: z.string()
        .min(1, 'O assento é obrigatório'),
    tipoBilhete: z.string().min(1, 'O tipo de bilhete é obrigatório'),
    preco: z.number().min(0, 'O preço não pode ser negativo'),
    statusPagamento: z.string().default('PENDENTE'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});

export type IngressoFormData = z.infer<typeof ingressoSchema>;
