import { z } from 'zod';

export interface ISessao {
    id?: string;
    filmeId: string;
    salaId: string;
    dataHora: string;
    preco: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export const sessaoSchema = z.object({
    id: z.string().optional(),
    filmeId: z.string().min(1, 'O filme é obrigatório'),
    salaId: z.string().min(1, 'A sala é obrigatória'),
    dataHora: z.string().min(1, 'A data e hora são obrigatórias'),
    preco: z.number().min(0, 'O preço não pode ser negativo'),
    status: z.string().default('DISPONIVEL'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
});

export type SessaoFormData = z.infer<typeof sessaoSchema>;
