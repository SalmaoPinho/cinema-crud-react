import { z } from 'zod';

export interface ILanche {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
}

export const lancheSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome do lanche é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    descricao: z.string()
        .min(1, 'A descrição é obrigatória')
        .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    preco: z.number()
        .min(0.01, 'O preço deve ser maior que zero'),
    imagem: z.string()
        .url('A imagem deve ser uma URL válida')
});

export type LancheFormData = z.infer<typeof lancheSchema>;
