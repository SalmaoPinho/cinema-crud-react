/**
 * Service base genérico para reduzir duplicação de código
 */

import { API_BASE_URL } from '../config/api';

export class BaseService<T> {
    protected baseURL: string;
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.baseURL = API_BASE_URL;
    }

    /**
     * Método genérico para fazer requisições HTTP
     */
    protected async request<R = T>(
        path: string = '',
        options: RequestInit = {}
    ): Promise<R> {
        const url = `${this.baseURL}${this.endpoint}${path}`;

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

            // Retorno vazio para DELETE
            if (response.status === 204) {
                return {} as R;
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição para ${url}:`, error);
            throw error;
        }
    }

    /**
     * Buscar todos os registros
     */
    async findAll(): Promise<T[]> {
        return this.request<T[]>('');
    }

    /**
     * Buscar registro por ID
     */
    async findById(id: number | string): Promise<T> {
        this.validateId(id);
        return this.request<T>(`/${id}`);
    }

    /**
     * Criar novo registro
     */
    async create(data: Omit<T, 'id'>): Promise<T> {
        return this.request<T>('', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * Atualizar registro existente
     */
    async update(id: number | string, data: Partial<T>): Promise<T> {
        this.validateId(id);
        return this.request<T>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * Deletar registro
     */
    async delete(id: number | string): Promise<void> {
        this.validateId(id);
        return this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }

    /**
     * Validar ID
     */
    protected validateId(id: number | string): void {
        if (!id) {
            throw new Error('ID é obrigatório');
        }
    }
}
