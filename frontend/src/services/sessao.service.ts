import { type ISessao } from "../models/sessao.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class SessoesService extends BaseService<ISessao> {
    constructor() {
        super(API_ENDPOINTS.sessoes);
    }

    // Métodos auxiliares específicos para sessões
    async findByFilmeId(filmeId: string): Promise<ISessao[]> {
        const sessoes = await this.findAll();
        return sessoes.filter(sessao => sessao.filmeId === filmeId);
    }

    async findBySalaId(salaId: string): Promise<ISessao[]> {
        const sessoes = await this.findAll();
        return sessoes.filter(sessao => sessao.salaId === salaId);
    }

    async findByStatus(status: 'ativa' | 'cancelada' | 'finalizada'): Promise<ISessao[]> {
        const sessoes = await this.findAll();
        return sessoes.filter(sessao => sessao.status === status);
    }

    async findToday(): Promise<ISessao[]> {
        const sessoes = await this.findAll();
        const today = new Date().toISOString().split('T')[0];
        return sessoes.filter(sessao => sessao.dataHora.startsWith(today));
    }
}

export const sessoesService = new SessoesService();
