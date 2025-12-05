import { type IFilme } from "../models/filme.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class FilmesService extends BaseService<IFilme> {
    constructor() {
        super(API_ENDPOINTS.filmes);
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
