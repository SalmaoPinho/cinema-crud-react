import { z } from 'zod';

export interface ISala {
    id?: string;
    nome: string;
    capacidade: number;
    tipo: 'STANDARD' | '3D' | 'IMAX' | '4DX' | 'VIP';
    recursos: {
        somDolby: boolean;
        arCondicionado: boolean;
        acessibilidade: boolean;
        lancheria: boolean;
    };
    status: 'ativa' | 'inativa' | 'manutencao';
}

export const salaSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome da sala é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    capacidade: z.number()
        .min(1, 'A capacidade deve ser no mínimo 1')
        .max(500, 'A capacidade máxima é 500 lugares'),
    tipo: z.enum(['STANDARD', '3D', 'IMAX', '4DX', 'VIP']),
    recursos: z.object({
        somDolby: z.boolean().default(false),
        arCondicionado: z.boolean().default(false),
        acessibilidade: z.boolean().default(false),
        lancheria: z.boolean().default(false),
    }),
    status: z.enum(['ativa', 'inativa', 'manutencao']).default('ativa')
});

export type SalaFormData = z.infer<typeof salaSchema>;
