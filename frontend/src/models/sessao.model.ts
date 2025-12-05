import { z } from 'zod';

export interface ISessao {
    id?: string;
    filmeId: string;
    salaId: string;
    dataHora: string;
    preco: number;
    idioma: 'dublado' | 'legendado' | 'original';
    formato: '2D' | '3D' | 'IMAX' | '4DX';
    assentosDisponiveis: number;
    status: 'ativa' | 'cancelada' | 'finalizada';
}

export const sessaoSchema = z.object({
    id: z.string().optional(),
    filmeId: z.string().min(1, 'O filme é obrigatório'),
    salaId: z.string().min(1, 'A sala é obrigatória'),
    dataHora: z.string(),
    preco: z.number()
        .min(0, 'O preço não pode ser negativo')
        .max(100, 'O preço máximo é R$ 100'),
    idioma: z.enum(['dublado', 'legendado', 'original']),
    formato: z.enum(['2D', '3D', 'IMAX', '4DX']),
    assentosDisponiveis: z.number()
        .min(0, 'Assentos não pode ser negativo'),
    status: z.enum(['ativa', 'cancelada', 'finalizada']).default('ativa')
}).refine((data) => {
    // Validação customizada: data da sessão não pode ser retroativa
    const dataHoraSessao = new Date(data.dataHora);
    const agora = new Date();
    return dataHoraSessao >= agora;
}, {
    message: 'A data da sessão não pode ser anterior à data atual',
    path: ['dataHora']
});

export type SessaoFormData = z.infer<typeof sessaoSchema>;
