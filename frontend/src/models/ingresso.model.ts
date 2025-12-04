import { z } from 'zod';

export interface IIngresso {
    id?: string;
    sessaoId: string;
    nomeComprador: string;
    emailComprador: string;
    assentoNumero: string;
    preco: number;
    statusPagamento: 'pendente' | 'pago' | 'cancelado' | 'reembolsado';
    tipoBilhete: 'inteiro' | 'meia-entrada' | 'gratuito' | 'promocional';
    dataPurchase: string;
    dataUso?: string;
}

export const ingressoSchema = z.object({
    id: z.string().optional(),
    sessaoId: z.string().min(1, 'A sessão é obrigatória'),
    nomeComprador: z.string()
        .min(1, 'O nome do comprador é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    emailComprador: z.string()
        .email('Email inválido'),
    assentoNumero: z.string()
        .min(1, 'O assento é obrigatório'),
    preco: z.number()
        .min(0, 'O preço não pode ser negativo'),
    statusPagamento: z.enum(['pendente', 'pago', 'cancelado', 'reembolsado']).default('pago'),
    tipoBilhete: z.enum(['inteiro', 'meia-entrada', 'gratuito', 'promocional']).default('inteiro'),
    dataPurchase: z.string(),
    dataUso: z.string().optional()
});

export type IngressoFormData = z.infer<typeof ingressoSchema>;
