import { type ILanche } from "../models/lanche.model";

const API_BASE_URL = import.meta.env.VITE_API_URL_LANCHES || 'http://localhost:4000/lanches';

export class LanchesService {

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

    async findAll(): Promise<ILanche[]> {
        return this.request<ILanche[]>('');
    }

    async findById(id: number | string): Promise<ILanche> {
        this.validateId(id);
        return this.request<ILanche>(`/${id}`);
    }

    async create(lanche: Omit<ILanche, 'id'>): Promise<ILanche> {
        return this.request<ILanche>('', {
            method: 'POST',
            body: JSON.stringify(lanche),
        });
    }

    async update(id: number | string, lanche: Partial<ILanche>): Promise<ILanche> {
        this.validateId(id);
        return this.request<ILanche>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(lanche),
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
}

export const lanchesService = new LanchesService();
