import { z } from 'zod';

export interface ISessoes {
    id?: string;
    filmeId: string;
    salaId: string;
    dataHora: Date;
    idioma: 'DUBLADO' | 'LEGENDADO' | 'ORIGINAL';
    preco?: number;
    formato: '2D' | '3D' | 'IMAX' | '4DX' | 'VIP';
    assentosDisponiveis: number;
}

export const sessoesSchema = z.object({
    id: z.string().optional(),
    filmeId: z.string().min(1, 'O ID do filme é obrigatório'),
    salaId: z.string().min(1, 'O ID da sala é obrigatório'),
    dataHora: z.date(),
    idioma: z.enum(['DUBLADO', 'LEGENDADO', 'ORIGINAL']),
    preco: z.number().min(0, 'O preço não pode ser negativo').optional(),
    formato: z.enum(['2D', '3D', 'IMAX', '4DX', 'VIP']),
    assentosDisponiveis: z.number().min(0, 'Os assentos disponíveis não podem ser negativos'),
});

export type SessoesFormData = z.infer<typeof sessoesSchema>;
