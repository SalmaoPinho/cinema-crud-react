import { type ISessao } from "../models/sessao.model";

// Variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL_SESSOES || 'http://localhost:4000/sessoes';

export class SessoesService {
    
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

    async findAll(): Promise<ISessao[]> {
        return this.request<ISessao[]>('');
    }

    async findById(id: number | string): Promise<ISessao> {
        this.validateId(id);
        return this.request<ISessao>(`/${id}`);
    }

    async create(sessao: Omit<ISessao, 'id'>): Promise<ISessao> {
        return this.request<ISessao>('', {
            method: 'POST',
            body: JSON.stringify(sessao),
        });
    }

    async update(id: number | string, sessao: Partial<ISessao>): Promise<ISessao> {
        this.validateId(id);
        return this.request<ISessao>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(sessao),
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
