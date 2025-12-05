import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/filmes - Listar todos os filmes
router.get('/', async (req, res, next) => {
    try {
        const filmes = await prisma.filme.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(filmes);
    } catch (error) {
        next(error);
    }
});

// GET /api/filmes/:id - Buscar filme por ID
router.get('/:id', async (req, res, next) => {
    try {
        const filme = await prisma.filme.findUnique({
            where: { id: req.params.id }
        });

        if (!filme) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }

        res.json(filme);
    } catch (error) {
        next(error);
    }
});

// POST /api/filmes - Criar novo filme
router.post('/', async (req, res, next) => {
    try {
        const filme = await prisma.filme.create({
            data: req.body
        });
        res.status(201).json(filme);
    } catch (error) {
        next(error);
    }
});

// PUT /api/filmes/:id - Atualizar filme
router.put('/:id', async (req, res, next) => {
    try {
        const filme = await prisma.filme.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(filme);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/filmes/:id - Deletar filme
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.filme.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
