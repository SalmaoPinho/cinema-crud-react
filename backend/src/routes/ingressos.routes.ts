import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/ingressos - Listar todos os ingressos
router.get('/', async (req, res, next) => {
    try {
        const ingressos = await prisma.ingresso.findMany({
            include: {
                sessao: {
                    include: {
                        filme: true,
                        sala: true
                    }
                },
                usuario: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(ingressos);
    } catch (error) {
        next(error);
    }
});

// GET /api/ingressos/:id - Buscar ingresso por ID
router.get('/:id', async (req, res, next) => {
    try {
        const ingresso = await prisma.ingresso.findUnique({
            where: { id: req.params.id },
            include: {
                sessao: {
                    include: {
                        filme: true,
                        sala: true
                    }
                },
                usuario: true
            }
        });
        if (!ingresso) {
            return res.status(404).json({ error: 'Ingresso não encontrado' });
        }
        res.json(ingresso);
    } catch (error) {
        next(error);
    }
});

// POST /api/ingressos - Criar novo ingresso
router.post('/', async (req, res, next) => {
    try {
        const { sessaoId, usuarioId, nomeComprador, emailComprador, assentoNumero, tipoBilhete, preco, statusPagamento } = req.body;

        const ingresso = await prisma.ingresso.create({
            data: {
                sessaoId,
                usuarioId: usuarioId || null,
                nomeComprador,
                emailComprador,
                assentoNumero,
                tipoBilhete,
                preco: Number(preco),
                statusPagamento: statusPagamento || 'PENDENTE'
            },
            include: {
                sessao: {
                    include: {
                        filme: true,
                        sala: true
                    }
                }
            }
        });
        res.status(201).json(ingresso);
    } catch (error) {
        next(error);
    }
});

// PUT /api/ingressos/:id - Atualizar ingresso
router.put('/:id', async (req, res, next) => {
    try {
        const { sessaoId, usuarioId, nomeComprador, emailComprador, assentoNumero, tipoBilhete, preco, statusPagamento } = req.body;

        const ingresso = await prisma.ingresso.update({
            where: { id: req.params.id },
            data: {
                ...(sessaoId && { sessaoId }),
                ...(usuarioId !== undefined && { usuarioId }),
                ...(nomeComprador && { nomeComprador }),
                ...(emailComprador && { emailComprador }),
                ...(assentoNumero && { assentoNumero }),
                ...(tipoBilhete && { tipoBilhete }),
                ...(preco && { preco: Number(preco) }),
                ...(statusPagamento && { statusPagamento })
            },
            include: {
                sessao: {
                    include: {
                        filme: true,
                        sala: true
                    }
                }
            }
        });
        res.json(ingresso);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/ingressos/:id - Deletar ingresso
router.delete('/:id', async (req, res, next) => {
    try {
        await prisma.ingresso.delete({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;
