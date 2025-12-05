import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/sessoes - Listar todas as sessões
router.get('/', async (req, res, next) => {
    try {
        const sessoes = await prisma.sessao.findMany({
            include: {
                filme: true,
                sala: true
            },
            orderBy: { dataHora: 'asc' }
        });
        res.json(sessoes);
    } catch (error) {
        next(error);
    }
});

// GET /api/sessoes/:id - Buscar sessão por ID
router.get('/:id', async (req, res, next) => {
    try {
        const sessao = await prisma.sessao.findUnique({
            where: { id: req.params.id },
            include: {
                filme: true,
                sala: true
            }
        });
        if (!sessao) {
            return res.status(404).json({ error: 'Sessão não encontrada' });
        }
        res.json(sessao);
    } catch (error) {
        next(error);
    }
});

// POST /api/sessoes - Criar nova sessão
router.post('/', async (req, res, next) => {
    try {
        const { filmeId, salaId, dataHora, preco, status } = req.body;

        const sessao = await prisma.sessao.create({
            data: {
                filmeId,
                salaId,
                dataHora,
                preco: Number(preco),
                status: status || 'DISPONIVEL'
            },
            include: {
                filme: true,
                sala: true
            }
        });
        res.status(201).json(sessao);
    } catch (error) {
        next(error);
    }
});

// PUT /api/sessoes/:id - Atualizar sessão
router.put('/:id', async (req, res, next) => {
    try {
        const { filmeId, salaId, dataHora, preco, status } = req.body;

        const sessao = await prisma.sessao.update({
            where: { id: req.params.id },
            data: {
                ...(filmeId && { filmeId }),
                ...(salaId && { salaId }),
                ...(dataHora && { dataHora }),
                ...(preco && { preco: Number(preco) }),
                ...(status && { status })
            },
            include: {
                filme: true,
                sala: true
            }
        });
        res.json(sessao);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/sessoes/:id - Deletar sessão
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.sessao.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
