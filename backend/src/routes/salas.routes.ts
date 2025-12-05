import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/salas - Listar todas as salas
router.get('/', async (req, res, next) => {
    try {
        const salas = await prisma.sala.findMany({
            orderBy: { nome: 'asc' }
        });
        res.json(salas);
    } catch (error) {
        next(error);
    }
});

// GET /api/salas/:id - Buscar sala por ID
router.get('/:id', async (req, res, next) => {
    try {
        const sala = await prisma.sala.findUnique({
            where: { id: req.params.id }
        });
        if (!sala) {
            return res.status(404).json({ error: 'Sala não encontrada' });
        }
        res.json(sala);
    } catch (error) {
        next(error);
    }
});

// POST /api/salas - Criar nova sala
router.post('/', async (req, res, next) => {
    try {
        const { nome, capacidade, tipo, status } = req.body;

        const sala = await prisma.sala.create({
            data: {
                nome,
                capacidade: Number(capacidade),
                tipo,
                status: status || 'ATIVA'
            }
        });
        res.status(201).json(sala);
    } catch (error) {
        next(error);
    }
});

// PUT /api/salas/:id - Atualizar sala
router.put('/:id', async (req, res, next) => {
    try {
        const { nome, capacidade, tipo, status } = req.body;

        const sala = await prisma.sala.update({
            where: { id: req.params.id },
            data: {
                ...(nome && { nome }),
                ...(capacidade && { capacidade: Number(capacidade) }),
                ...(tipo && { tipo }),
                ...(status && { status })
            }
        });
        res.json(sala);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/salas/:id - Deletar sala
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.sala.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
