import { type ISala } from "../models/sala.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class SalasService extends BaseService<ISala> {
    constructor() {
        super(API_ENDPOINTS.salas);
    }

    // Métodos auxiliares específicos para salas
    async findByStatus(status: 'ativa' | 'inativa' | 'manutencao'): Promise<ISala[]> {
        const salas = await this.findAll();
        return salas.filter(sala => sala.status === status);
    }

    async findByTipo(tipo: string): Promise<ISala[]> {
        const salas = await this.findAll();
        return salas.filter(sala => sala.tipo === tipo);
    }

    async getTotalCapacidade(): Promise<number> {
        const salas = await this.findAll();
        return salas.reduce((total, sala) => total + sala.capacidade, 0);
    }
}

export const salasService = new SalasService();
