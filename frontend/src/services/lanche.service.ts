import { type ILanche } from "../models/lanche.model";
import { BaseService } from "./base.service";
import { API_ENDPOINTS } from "../config/api";

export class LanchesService extends BaseService<ILanche> {
    constructor() {
        super(API_ENDPOINTS.lanches);
    }
}

export const lanchesService = new LanchesService();
