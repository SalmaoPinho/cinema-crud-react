import { type IUsuario } from "../models/usuario.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class UsuariosService extends BaseService<IUsuario> {
    constructor() {
        super(API_ENDPOINTS.usuarios);
    }

    /**
     * ✅ CORREÇÃO APLICADA AQUI:
     * Removemos o 'id' do corpo da requisição para não dar conflito no backend.
     */
    async update(id: number | string, usuario: Partial<IUsuario>): Promise<IUsuario> {
        this.validateId(id);

        // Separa o ID do resto dos dados
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: idIgnorado, ...dadosParaSalvar } = usuario;

        return this.request<IUsuario>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dadosParaSalvar), // Envia apenas os dados, sem o ID
        });
    }
}

export const usuariosService = new UsuariosService();