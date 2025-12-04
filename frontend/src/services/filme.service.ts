import { type IFilme } from "../models/filme.model";

// Variáveis de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL_FILMES || 'http://localhost:4000/filmes';

export class FilmesService {
    
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

    async findAll(): Promise<IFilme[]> {
        return this.request<IFilme[]>('');
    }

    async findById(id: number | string): Promise<IFilme> {
        this.validateId(id);
        return this.request<IFilme>(`/${id}`);
    }

    async create(filme: Omit<IFilme, 'id'>): Promise<IFilme> {
        return this.request<IFilme>('', {
            method: 'POST',
            body: JSON.stringify(filme),
        });
    }

    async update(id: number | string, filme: Partial<IFilme>): Promise<IFilme> {
        this.validateId(id);
        return this.request<IFilme>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
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

    // Métodos auxiliares específicos para filmes
    async findByStatus(status: 'em-cartaz' | 'em-breve' | 'fora-cartaz'): Promise<IFilme[]> {
        const filmes = await this.findAll();
        return filmes.filter(filme => filme.status === status);
    }

    async findByGenero(genero: string): Promise<IFilme[]> {
        const filmes = await this.findAll();
        return filmes.filter(filme => filme.genero === genero);
    }
}

export const filmesService = new FilmesService();
