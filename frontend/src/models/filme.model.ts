import { z } from 'zod';

export interface IFilme {
    id?: string;
    titulo: string;
    descricao: string;
    genero: 'acao' | 'drama' | 'ficcao' | 'comedia' | 'thriller' | 'romance' | 'infantil';
    classificacao: '0' | '6' | '10' | '12' | '14' | '16' | '18';
    duracao: number;
    dataEstreia: string;
    imagem: string;
    status: 'em-cartaz' | 'em-breve' | 'fora-cartaz';
}

export const filmeSchema = z.object({
    id: z.string().optional(),
    titulo: z.string()
        .min(1, 'O título é obrigatório')
        .min(3, 'O título deve ter no mínimo 3 caracteres'),
    descricao: z.string()
        .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    genero: z.enum(['acao', 'drama', 'ficcao', 'comedia', 'thriller', 'romance', 'infantil']),
    classificacao: z.enum(['0', '6', '10', '12', '14', '16', '18']),
    duracao: z.number()
        .min(30, 'O filme deve ter no mínimo 30 minutos')
        .max(240, 'O filme não pode ter mais de 240 minutos'),
    dataEstreia: z.string(),
    imagem: z.string().url('URL da imagem inválida'),
    status: z.enum(['em-cartaz', 'em-breve', 'fora-cartaz']).default('em-cartaz')
});

export type FilmeFormData = z.infer<typeof filmeSchema>;
