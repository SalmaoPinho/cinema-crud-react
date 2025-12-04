import { type IIngresso } from "../models/ingresso.model";

// Variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL_INGRESSOS || 'http://localhost:4000/ingressos';

export class IngressosService {
    
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorMessage = await response.text().catch(() => response.statusText);
                throw new Error(`Erro API (${response.status}): ${errorMessage}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição para ${url}:`, error);
            throw error;
        }
    }

    async findAll(): Promise<IIngresso[]> {
        return this.request<IIngresso[]>('');
    }

    async findById(id: number | string): Promise<IIngresso> {
        this.validateId(id);
        return this.request<IIngresso>(`/${id}`);
    }

    async create(ingresso: Omit<IIngresso, 'id'>): Promise<IIngresso> {
        return this.request<IIngresso>('', {
            method: 'POST',
            body: JSON.stringify(ingresso),
        });
    }

    async update(id: number | string, ingresso: Partial<IIngresso>): Promise<IIngresso> {
        this.validateId(id);
        return this.request<IIngresso>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(ingresso),
        });
    }

    async delete(id: number | string): Promise<void> {
        this.validateId(id);
        return this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }

    private validateId(id: number | string): void {
        if (!id) {
            throw new Error('ID é obrigatório');
        }
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
