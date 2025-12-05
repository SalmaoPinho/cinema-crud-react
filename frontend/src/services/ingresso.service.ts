import { type IIngresso } from "../models/ingresso.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class IngressosService extends BaseService<IIngresso> {
    constructor() {
        super(API_ENDPOINTS.ingressos);
    }

    // Métodos auxiliares específicos para ingressos
    async findBySessaoId(sessaoId: string): Promise<IIngresso[]> {
        const ingressos = await this.findAll();
        return ingressos.filter(ingresso => ingresso.sessaoId === sessaoId);
    }

    async findByStatusPagamento(status: 'pendente' | 'pago' | 'cancelado' | 'reembolsado'): Promise<IIngresso[]> {
        const ingressos = await this.findAll();
        return ingressos.filter(ingresso => ingresso.statusPagamento === status);
    }

    async findByTipoBilhete(tipo: 'inteiro' | 'meia-entrada' | 'gratuito' | 'promocional'): Promise<IIngresso[]> {
        const ingressos = await this.findAll();
        return ingressos.filter(ingresso => ingresso.tipoBilhete === tipo);
    }

    async countVendidos(): Promise<number> {
        const ingressos = await this.findByStatusPagamento('pago');
        return ingressos.length;
    }

    async calcularReceitaTotal(): Promise<number> {
        const ingressos = await this.findByStatusPagamento('pago');
        return ingressos.reduce((total, ingresso) => total + ingresso.preco, 0);
    }
}

export const ingressosService = new IngressosService();
